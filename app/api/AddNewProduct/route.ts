// pages/api/create-product.js
import Stripe from 'stripe';
import { createClient } from '../../lib/supaBase/server'
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { decode } from 'base64-arraybuffer'
import { globalInfoType, catalogType, sizeType} from '../../Type/type'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST method to handle adding a product
 * @param {Request} req
 * @returns {Response}
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const formData = await request.formData();
    // Fetch Exchange Rate from USD to GEL
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`);
    const exchangeRateData = await response.json();
    const usdToGelRate = exchangeRateData.conversion_rates.GEL;
    const globalInfo:globalInfoType = JSON.parse(formData.get('globalInfo') as string);
    let title_en = globalInfo.title_en;
    let title_ge = globalInfo.title_ge;
    let description_en = globalInfo.description_en;
    let description_ge = globalInfo.description_ge;
    let gender = globalInfo.gender;
    let category_ID = globalInfo.selectedCategory;
    let tags = globalInfo.tag;

    // Add product to Supabase
    const { data: productData,error: productError } = await supabase.from("GlobalProductInfo").insert({
      title_en: title_en,
      title_ge: title_ge,
      description_en: description_en,
      description_ge: description_ge,
      gender: gender,
      category_ID: category_ID,
      tags: tags
    }).select("product_id");

    if (productError) {
      throw new Error(`Up dating GlobalProductInfo table error Error: ${productError.message}`);
    }
    const catalogArray:catalogType[] = JSON.parse(formData.get('catalogArray') as string);
    //Add product with different colors
    for (let i = 0; i < catalogArray.length; i++) {
      const catalog:catalogType = catalogArray[i];
      //add product colors
      try {
        const { data: catalogData, error: catalogError } = await supabase.from("productColors").insert({
          product_id: productData[0].product_id,
          color_Code: catalog.color,
          color_ge: catalog.color_ge,
          color_en: catalog.color_en,
        }).select("productColorID")
        if (catalogError) {
          throw new Error(`Up dating productColors table error: ${catalogError.message}`);
        }
        // Add product sizes
        for(const[key, value] of Object.entries(catalog.sizeObj)){
            const sizeValue = value as sizeType;
            if(sizeValue.count != 0 && sizeValue.price != 0){
            // Create a product in Stripe
            const stripeProduct = await stripe.products.create({
              name: globalInfo.title_en,
              description: globalInfo.description_en,
              metadata: {
                productID: productData[0].product_id,
                colorID: catalogData[0].productColorID,
                size: key,
              },
            });
            // Create a price for the product
          const stripePrice = await stripe.prices.create({
              product: stripeProduct.id,
              unit_amount: sizeValue.price * 100,
              currency: "usd",
            });

            const { data: product, error: productError } = await supabase
              .from('productStock')
              .insert([
                { size: key,
                  count: sizeValue.count,
                  stripe_ProductID: stripeProduct.id,
                  product_ColorID: catalogData[0].productColorID,
                  price_usd:sizeValue.price,
                  price_lari: parseFloat((sizeValue.price * usdToGelRate).toFixed(0))
                },
              ])
              if(productError){
                throw new Error(`Up dating productStock table error: ${catalogError.message}`);
              }
            }
        }
        const imageArray:string[] = catalog.base64Img
        let imageUrls: string[] = [];

        //upload images
        for(let k = 0; k < catalog.base64Img.length; k++){
          const image = imageArray[k]
          const base64String = image.replace(/^data:image\/\w+;base64,/, '');
          /// Store Images
          const {data:UploadImage, error: UploadImageError} = await supabase
            .storage
            .from('product_images')
            .upload(`${gender}/${catalogData[0].productColorID}-${k}.png`, decode(base64String), {
              contentType: 'image/png'
            })
            if(UploadImageError){
              throw new Error(`Up dating productStock table error: ${UploadImageError.message}`);
            }
            const { data: publicUrl } = supabase.storage
                  .from('product_images')
                  .getPublicUrl(UploadImage?.path as string)
            imageUrls.push(publicUrl.publicUrl);
        }
        //add images to table
      const { data, error } = await supabase
            .from('Images')
            .insert([
              { productColorID: catalogData[0].productColorID,
                imageURL: imageUrls,
                isPrimary:imageUrls[0]
              },
            ]);
            if (error) {
              throw new Error(`Up dating Images table error: ${error.message}`);
            }
      }catch (error) {
        console.log(error);
      }
    }
    return NextResponse.json(
      { message: "Product added successfully" ,
        id: productData[0].product_id
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   try {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const supaBase = await createClient();
//     const { globalInfo, catalogArray } = req.body;

//     // 1. Add product to Supabase Product Table
//     const { data: productData, error: productError } = await supaBase
//       .from('products')
//       .insert([{
//         title_en: globalInfo.title_en,
//         title_ge: globalInfo.title_ge,
//         description_en: globalInfo.description_en,
//         description_ge: globalInfo.description_ge,
//         category_id: globalInfo.gender,
//       }])
//       .select('product_id')
//       .single();

//     if (productError) throw new Error(`Failed to add product: ${productError.message}`);

//     // 2. Process each catalog item
//     for (const catalog of catalogArray) {
//       // 2.1 Add product color to Supabase
//       const { data: colorData, error: colorError } = await supaBase
//         .from('productColor')
//         .insert([{
//           product_id: productData.product_id,
//           color_code: catalog.color,
//           color_en: catalog.color_en,
//           color_ge: catalog.color_ge,
//         }])
//         .select('productColorID')
//         .single();

//       if (colorError) throw new Error(`Failed to add product color: ${colorError.message}`);

//       // 2.2 Upload product images
//       const uploadResults = await Promise.all(
//         catalog.img.map(async (file) => {
//           const { data, error } = await supabase
//             .storage
//             .from('product_images')
//             .upload(file.fileName, file, { cacheControl: '3600', upsert: false });
//           if (error) throw new Error(`Failed to upload image ${file.fileName}: ${error.message}`);
//           return data.path; // Return the uploaded file path
//         })
//       );

//       // 2.3 Add image URLs to Supabase ProductImages Table
//       const { error: imgError } = await supaBase.from('productImages').insert([{
//         productColorId: colorData.productColorID,
//         image_urls: JSON.stringify(uploadResults),
//       }]);

//       if (imgError) throw new Error(`Failed to add product images: ${imgError.message}`);

//       // 2.4 Add product sizes, create Stripe products, and update stock
//       await Promise.all(
//         catalog.sizeObj.map(async (size) => {
//           // Create Stripe product
//           const stripeProduct = await stripe.products.create({
//             name: `${globalInfo.title_ge} - Size ${size.size}`,
//             images: [uploadResults[0]], // Use the first image as a representative
//           });

//           // Create Stripe price
//           const stripePrice = await stripe.prices.create({
//             unit_amount: size.price * 100, // Convert to cents
//             currency: 'GEL',
//             product: stripeProduct.id,
//           });

//           // Add size and stock to Supabase
//           const { error: stockError } = await supaBase.from('productStock').insert([{
//             productColorID: colorData.productColorID,
//             size: size.size,
//             quantity: size.count,
//             price_lari: size.price,
//             stripe_ProductID: stripeProduct.id,
//           }]);

//           if (stockError) throw new Error(`Failed to update stock for size ${size.size}: ${stockError.message}`);
//         })
//       );
//     }

//     res.status(200).json({ success: true, message: 'Product created successfully!' });
//   } catch (error) {
//     console.error('Error creating product:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// }
