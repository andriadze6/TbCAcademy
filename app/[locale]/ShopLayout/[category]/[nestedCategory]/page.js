import '@/app/assets/css/shopLayout.css'
import SearchProducts from '@/app/components/SearchProducts'
 export default function ShopLayout(props){
    return(
        <SearchProducts parametrs={props}></SearchProducts>
    )
}