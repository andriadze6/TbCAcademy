import '../../assets/css/shopLayout.css'
import SearchProducts from '../../components/SearchProducts'
import Header from '@/app/[locale]/components/Header'

 export default function ShopLayout(props){
    return(
        <>
            <Header></Header>
            <SearchProducts parametrs={props}></SearchProducts>
        </>
    )
}
