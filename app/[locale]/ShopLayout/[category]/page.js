import '../../assets/css/shopLayout.css'
import SearchProducts from '../../components/SearchProducts'

 export default function ShopLayout(props){
    return(
        <>
            <SearchProducts parametrs={props}></SearchProducts>
        </>
    )
}
