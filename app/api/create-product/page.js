// pages/api/create-product.js
import Stripe from 'stripe';
import { supabase } from 'app/lib/supaBase/supabaseClient';
import { createClient } from 'app/lib/supaBase/server';
import { title } from 'process';
import { json } from 'stream/consumers';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const supaBase = await createClient()

      const { globalInfo, catalogArray } = req.body;

      /// 1.addr  product in SupBase Product Table
      const {productData, error} = await supaBase.from('products').insert([{
        title_en: globalInfo.title_en,
        title_ge: globalInfo.title_ge,
        description_en: globalInfo.description_en,
        description_ge: globalInfo.description_ge,
        category_id: globalInfo.gender, /// უნდა შვეცვალო გენდერ ID
      }]).select('product_id').single();

      /// 2.add  productColor
      catalogArray.forEach( async (catalog) => {
        /// 2.1 add productColor table
        const {colorData,error} = supaBase.from('productColor').insert([{
          product_id: productData.product_id,
          color_code: catalog.color,
          color_en: catalog.color_en,
          color_ge: catalog.color_ge,
        }]).select('productColorID').single();

        /// 2.2 upload productImages
        const uploadPromises = catalog.img.map((file) => {
          const fileName = file.fileName;
          return supabase
            .storage
            .from('product_images')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false,
            })
            .then(({ data, error }) => {
              if (error) {
                console.error(`Error uploading ${fileName}:`, error);
                throw error; // Optional: throw to handle errors in Promise.all
              }
              console.log(`File uploaded:`, data);
              return data; // Return the successful result
            });
        });
        try {
          const results = await Promise.all(uploadPromises);
          try{
            /// 2.3 add Images Url in SupBase ProductImages Table
            const {imgTableData, error} = await supaBase.from('productImages').insert([{
              productColorId: colorData.productColorID,
              image_url: JSON.stringify(results),
            }])
            const sizePromises = catalog.sizeObj.map(async(obj) => {
                /// create stripe product
                const stripeProduct = await stripe.products.create({
                  name: `${globalInfo.title_ge}-size${obj.size}`,
                  attributes: [productData.product_id, colorData.productColorID, obj.size],
                  images:results[0].path,
                });
                /// create stripe price
                const stripePrice = await stripe.prices.create({
                  unit_amount: obj.price,
                  currency: 'GEL',
                  product: stripeProduct.id,
                });
                /// create promise productStock
                return supabase.from('productStock').insert([{
                  productColorID: colorData.productColorID,
                  size: obj.size,
                  quantity: obj.count,
                  price_lari: obj.price,
                  stripe_ProductID: stripeProduct.id,
                }])
                .then(({ data, error }) => {
                  if (error) {
                    console.error(`Error creating stocking promise:`, error);
                    throw error; // Optional: throw to handle errors in Promise.all
                  }
                  return data; // Return the successful result
                });
            })
            try {
              /// 2.4 add productStock
              const results = await Promise.all(sizePromises);
            } catch (error) {
              console.error('product Stock table was not updated:', err);
            }
          }
          catch(err){
            console.error('Error uploading colorTable:', err);
          }
          console.log('All files uploaded:', results);
        } catch (err) {
          console.error('One or more uploads failed:', err);
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
