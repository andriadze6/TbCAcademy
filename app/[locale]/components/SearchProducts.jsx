import '../assets/css/shopLayout.css'
import ShopLayoutDiv from '@/app/[locale]/components/ShopLayout';
import GetallWomanProduts from '../../Functions/GeAllWomanProducts';
async function getProduct(props) {
    let {category, nestedCategory} = props.params;
    let searchParams = props.searchParams.query
    if(category=='woman'){
        if(!nestedCategory){
            var data = await GetallWomanProduts();
            return {Product:data, Category:category, NestedCategory: nestedCategory, SearchParams:searchParams}
        }
        else{
            data = await fetch(`https://dummyjson.com/products/category/${nestedCategory}`);
            var dataJson =  await data.json()
            return {Product:dataJson.products, Category:category, NestedCategory: nestedCategory, SearchParams:searchParams}
        }
    }else{
        data = await fetch(`https://dummyjson.com/products/search?q=${searchParams}`);
        dataJson = await data.json();
        if(dataJson.products.length > 0){
            return {Product:dataJson.products, Category:category, NestedCategory: nestedCategory, SearchParams:searchParams}
        }else{
            data = await fetch(`https://dummyjson.com/products`)
            var dataJson = await data.json();
            return {Product:dataJson.products, Category:category, NestedCategory: nestedCategory, SearchParams:searchParams}
        }
    }   
}   
async function ShopLayout(props){   
    console.log("ShopLayout");  
    const result = await getProduct(props.parametrs);
    return(
        <ShopLayoutDiv Result={result} ></ShopLayoutDiv>
    )
}
export default ShopLayout;