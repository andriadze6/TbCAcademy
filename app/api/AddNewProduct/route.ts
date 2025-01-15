// pages/api/create-product.js
import Stripe from 'stripe';
import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';
import { decode } from 'base64-arraybuffer';
import { globalInfoType, catalogType, sizeType } from '../../Type/type';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


async function processCatalogArray(catalogArray, supabase, stripe, globalInfo, productId, usdToGelRate) {
  try {
    // Map catalog processing into Promises
    const catalogPromises = catalogArray.map(async (catalog) => {
      // Insert into productColors table
      const { data: catalogData, error: catalogError } = await supabase
        .from('productColors')
        .insert({
          product_id: productId,
          color_Code: catalog.color,
          color_ge: catalog.color_ge,
          color_en: catalog.color_en,
        })
        .select('productColorID');

      if (catalogError) {
        throw new Error(`Error inserting productColors: ${catalogError.message}`);
      }

      const productColorID = catalogData[0].productColorID;

      // Process sizes and create Stripe products and prices
      await processCatalogSizes(catalog, stripe, supabase, globalInfo, productId, productColorID, usdToGelRate);

      // Upload images
      const imageUrls = await uploadImages(supabase, catalogData[0], catalog.base64Img, globalInfo.gender);

      // Add images to Images table
      const { error: imageError } = await supabase
        .from('Images')
        .insert({
          productColorID,
          imageURL: imageUrls,
          isPrimary: imageUrls[0],
        });

      if (imageError) {
        throw new Error(`Error inserting Images: ${imageError.message}`);
      }

      // Return the productColorID for this catalog
      return { productColorID, imageUrls };
    });

    // Execute all catalog processing Promises concurrently and collect results
    const results = await Promise.all(catalogPromises);

    return results; // Returns an array of results, each with productColorID and other relevant data
  } catch (error) {
    console.error('Error processing catalog array:', error);
    throw error;
  }
}



async function processCatalogSizes(catalog, stripe, supabase, globalInfo, productId, productColorID, usdToGelRate) {
  try {
    const sizePromises = Object.entries(catalog.sizeObj) // Filter sizes with count and price
      .map(async ([size, value]) => {
        const sizeValue = value as sizeType;

        // Create Stripe Product
        const stripeProduct = await stripe.products.create({
          name: globalInfo.title_en,
          description: globalInfo.description_en,
          metadata: {
            productID: productId,
            colorID: productColorID,
            size,
          },
        });

        // Create Stripe Price
        const stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: sizeValue.price * 100,
          currency: 'usd',
        });

        // Insert into Supabase productStock
        const { error: stockError } = await supabase
          .from('productStock')
          .insert({
            size,
            count: sizeValue.count,
            stripe_ProductID: stripeProduct.id,
            product_ColorID: productColorID,
            price_usd: sizeValue.price,
            price_lari: parseFloat((sizeValue.price * usdToGelRate).toFixed(0)),
          });

        if (stockError) {
          throw new Error(`Error inserting productStock: ${stockError.message}`);
        }
      });

    // Wait for all promises to complete
    await Promise.all(sizePromises);
  } catch (error) {
    console.error('Error processing catalog sizes:', error);
    throw error;
  }
}

/**
 * Helper function to upload images and return their URLs
 */
async function uploadImages(supabase, catalogData, imageArray, gender) {
  try {
    // Map each image upload operation into a Promise
    const uploadPromises = imageArray.map((image, index) => {
      const base64String = image.replace(/^data:image\/\w+;base64,/, '');
      const filePath = `${gender}/${catalogData.productColorID}-${index}.png`;
      const decodedImage = decode(base64String);

      return supabase.storage
        .from('product_images')
        .upload(filePath, decodedImage, { contentType: 'image/png' })
        .then(({ data: uploadedImage, error: uploadError }) => {
          if (uploadError) {
            throw new Error(`Error uploading image: ${uploadError.message}`);
          }

          // Fetch the public URL for the uploaded image
          const { data: publicUrl, error: urlError  } = supabase.storage
            .from('product_images')
            .getPublicUrl(uploadedImage.path);
            if (urlError) {
              throw new Error(`Error fetching public URL: ${urlError.message}`);
            }
          return publicUrl.publicUrl;
        });
    });

    // Execute all upload Promises in parallel
    const imageUrls = await Promise.all(uploadPromises);

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

/**
 * POST method to handle adding a product
 */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const formData = await request.formData();

    // Fetch exchange rate
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`);
    const exchangeRateData = await response.json();
    const usdToGelRate = exchangeRateData.conversion_rates.GEL;

    const globalInfo = JSON.parse(formData.get('globalInfo'));
    const catalogArray = JSON.parse(formData.get('catalogArray'));

    // Add product to GlobalProductInfo table
    const { data: productData, error: productError } = await supabase
      .from('GlobalProductInfo')
      .insert({
        title_en: globalInfo.title_en,
        title_ge: globalInfo.title_ge,
        description_en: globalInfo.description_en,
        description_ge: globalInfo.description_ge,
        gender: globalInfo.gender,
        category_ID: globalInfo.selectedCategory,
        tags: globalInfo.tag,
      })
      .select('product_id');

    if (productError) {
      throw new Error(`Error inserting GlobalProductInfo: ${productError.message}`);
    }

    const productId = productData[0].product_id;
    let result = processCatalogArray(catalogArray, supabase, stripe, globalInfo, productId, usdToGelRate)
    const productColorID = result[0].productColorID;
    // for (const catalog of catalogArray) {
    //   const { data: catalogData, error: catalogError } = await supabase
    //     .from('productColors')
    //     .insert({
    //       product_id: productId,
    //       color_Code: catalog.color,
    //       color_ge: catalog.color_ge,
    //       color_en: catalog.color_en,
    //     })
    //     .select('productColorID');

    //   if (catalogError) {
    //     throw new Error(`Error inserting productColors: ${catalogError.message}`);
    //   }

    //   productColorID = catalogData[0].productColorID;



    //   // Add sizes and create Stripe products and prices

    //   processCatalogSizes(catalog, stripe, supabase, globalInfo, productId, productColorID, usdToGelRate)
    //   // for (const [size, value] of Object.entries(catalog.sizeObj)) {
    //   //   const sizeValue = value as sizeType;
    //   //   if (sizeValue.count && sizeValue.price) {
    //   //     const stripeProduct = await stripe.products.create({
    //   //       name: globalInfo.title_en,
    //   //       description: globalInfo.description_en,
    //   //       metadata: {
    //   //         productID: productId,
    //   //         colorID: productColorID,
    //   //         size,
    //   //       },
    //   //     });

    //   //     const stripePrice = await stripe.prices.create({
    //   //       product: stripeProduct.id,
    //   //       unit_amount: sizeValue.price * 100,
    //   //       currency: 'usd',
    //   //     });

    //   //     const { error: stockError } = await supabase
    //   //       .from('productStock')
    //   //       .insert({
    //   //         size,
    //   //         count: sizeValue.count,
    //   //         stripe_ProductID: stripeProduct.id,
    //   //         product_ColorID: productColorID,
    //   //         price_usd: sizeValue.price,
    //   //         price_lari: parseFloat((sizeValue.price * usdToGelRate).toFixed(0)),
    //   //       });

    //   //     if (stockError) {
    //   //       throw new Error(`Error inserting productStock: ${stockError.message}`);
    //   //     }
    //   //   }
    //   // }

    //   // Upload images
    //   const imageUrls = await uploadImages(supabase, catalogData[0], catalog.base64Img, globalInfo.gender);

    //   // Add images to Images table
    //   const { error: imageError } = await supabase
    //     .from('Images')
    //     .insert({
    //       productColorID,
    //       imageURL: imageUrls,
    //       isPrimary: imageUrls[0],
    //     });

    //   if (imageError) {
    //     throw new Error(`Error inserting Images: ${imageError.message}`);
    //   }
    // }

    return NextResponse.json(
      { message: 'Product added successfully', id:  productColorID},
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
