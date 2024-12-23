// pages/api/create-product.js
import Stripe from 'stripe';
import { supabase } from 'app/lib/supaBase/supabaseClient';
import { createClient } from 'app/lib/supaBase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supaBase = await createClient();
    const { globalInfo, catalogArray } = req.body;

    // 1. Add product to Supabase Product Table
    const { data: productData, error: productError } = await supaBase
      .from('products')
      .insert([{
        title_en: globalInfo.title_en,
        title_ge: globalInfo.title_ge,
        description_en: globalInfo.description_en,
        description_ge: globalInfo.description_ge,
        category_id: globalInfo.gender,
      }])
      .select('product_id')
      .single();

    if (productError) throw new Error(`Failed to add product: ${productError.message}`);

    // 2. Process each catalog item
    for (const catalog of catalogArray) {
      // 2.1 Add product color to Supabase
      const { data: colorData, error: colorError } = await supaBase
        .from('productColor')
        .insert([{
          product_id: productData.product_id,
          color_code: catalog.color,
          color_en: catalog.color_en,
          color_ge: catalog.color_ge,
        }])
        .select('productColorID')
        .single();

      if (colorError) throw new Error(`Failed to add product color: ${colorError.message}`);

      // 2.2 Upload product images
      const uploadResults = await Promise.all(
        catalog.img.map(async (file) => {
          const { data, error } = await supabase
            .storage
            .from('product_images')
            .upload(file.fileName, file, { cacheControl: '3600', upsert: false });
          if (error) throw new Error(`Failed to upload image ${file.fileName}: ${error.message}`);
          return data.path; // Return the uploaded file path
        })
      );

      // 2.3 Add image URLs to Supabase ProductImages Table
      const { error: imgError } = await supaBase.from('productImages').insert([{
        productColorId: colorData.productColorID,
        image_urls: JSON.stringify(uploadResults),
      }]);

      if (imgError) throw new Error(`Failed to add product images: ${imgError.message}`);

      // 2.4 Add product sizes, create Stripe products, and update stock
      await Promise.all(
        catalog.sizeObj.map(async (size) => {
          // Create Stripe product
          const stripeProduct = await stripe.products.create({
            name: `${globalInfo.title_ge} - Size ${size.size}`,
            images: [uploadResults[0]], // Use the first image as a representative
          });

          // Create Stripe price
          const stripePrice = await stripe.prices.create({
            unit_amount: size.price * 100, // Convert to cents
            currency: 'GEL',
            product: stripeProduct.id,
          });

          // Add size and stock to Supabase
          const { error: stockError } = await supaBase.from('productStock').insert([{
            productColorID: colorData.productColorID,
            size: size.size,
            quantity: size.count,
            price_lari: size.price,
            stripe_ProductID: stripeProduct.id,
          }]);

          if (stockError) throw new Error(`Failed to update stock for size ${size.size}: ${stockError.message}`);
        })
      );
    }

    res.status(200).json({ success: true, message: 'Product created successfully!' });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: error.message });
  }
}
