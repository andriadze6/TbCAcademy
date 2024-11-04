export default async function GetallWomanProduts(sort=false, order="asc"){
    let sortParams = sort ? `?sortBy=price&order=asc`:" ";
    let [dresses, bags,jewellery,shoes,watches] = await Promise.all([
        fetch(`https://dummyjson.com/products/category/womens-dresses${sortParams}`),
        fetch(`https://dummyjson.com/products/category/womens-bags${sortParams}`),
        fetch(`https://dummyjson.com/products/category/womens-jewellery${sortParams}`),
        fetch(`https://dummyjson.com/products/category/womens-shoes${sortParams}`),
        fetch(`https://dummyjson.com/products/category/womens-watches${sortParams}`),
    ])
    let [dressesJ, bagsJ,jewelleryJ,shoesJ,watcheJ] = await Promise.all([
        dresses.json(), bags.json(), jewellery.json(), shoes.json(), watches.json()
    ])
    var data = [...dressesJ.products, ...bagsJ.products, ...jewelleryJ.products, ...shoesJ.products, ...watcheJ.products]
    return data
}