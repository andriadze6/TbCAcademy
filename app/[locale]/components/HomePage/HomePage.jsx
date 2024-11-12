import '../../assets/css/homePage.css';
import Trending from './TrendingCategory';
import MainSwiper from './MainSlider';
async function GetHomePageData(params) {
    const [woman, man] = await Promise.all([
        fetch('https://dummyjson.com/products/category/womens-dresses'),
        fetch('https://dummyjson.com/products/category/mens-shirts')
    ])
    let [manT, womanT] = await Promise.all([
        man.json(), woman.json()
    ])
    return [manT.products,womanT.products]
}

async function HomePage(){
    const data = await GetHomePageData();
    return(
        <>
            <div className="homePage-Div">
                <MainSwiper data={data[0]}></MainSwiper>
                <Trending props={data}></Trending>
            </div>   
        </>
    )
}
export default HomePage;