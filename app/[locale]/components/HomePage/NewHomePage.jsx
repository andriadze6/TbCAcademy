import Image from "next/image";
import "../../assets/css/NewHomePage.css"
import BillboardImg1 from "../../assets/img/homePageImg/NewHomePage/Header-Img1.png"
import BillboardImg2 from "../../assets/img/homePageImg/NewHomePage/Header-Img2.png"
import BillboardImg3 from "../../assets/img/homePageImg/NewHomePage/Header-Img3.png"
import BillboardImg4 from "../../assets/img/homePageImg/NewHomePage/Header-Img4.png"
import BillboardImg5 from "../../assets/img/homePageImg/NewHomePage/Header-Img5.png"
import KidsTrending from "../../assets/img/homePageImg/Trending/Kids.png"
import ManTrending from "../../assets/img/homePageImg/Trending/Man/ManTrending.png"
import ManTrending2 from "../../assets/img/homePageImg/Trending/Man/ManTrending2.png"
import WomanTrending from "../../assets/img/homePageImg/Trending/WomanTrend.png"

import SwimWear from '../../assets/img/homePageImg/NewHomePage/SwimWear.png'
// async function GetHomePageData(params) {
//     const [woman, man] = await Promise.all([
//         fetch('https://dummyjson.com/products/category/womens-dresses'),
//         fetch('https://dummyjson.com/products/category/mens-shirts')
//     ])
//     let [manT, womanT] = await Promise.all([
//         man.json(), woman.json()
//     ])
//     return [manT.products,womanT.products]
// }

async function HomePage(){
    // const data = await GetHomePageData();
    return(
        <>
            <div className="mainBillboard">
                <div className="mainBillboard-1Column">
                    <div className="mainBillboard-ImgDiv">
                        <div>
                            <Image
                            src={SwimWear} // Make sure SwimWear is imported correctly
                            alt="Swimwear Collection"
                            className="mainBillboard-Img"
                        />
                        </div>
                        <div className="text-Div">
                            <h4>Low price? love it!</h4>
                            <h3>Swimwear<br/>Collection</h3>
                            <button className="roundButton">shop now</button>
                        </div>
                    </div>
                </div>
                <div className="mainBillboard-2Column">
                    <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px"}}>
                        <div className="mainBillboard-ImgDiv">
                            <div>
                                <Image  className="mainBillboard-Img" alt="" src={BillboardImg2}/>
                            </div>
                            <div className="text-Div">
                                <h4 style={{fontSize:"30px"}}>Get your glow on</h4>
                                <button className="lineButton">shop now</button>
                            </div>
                        </div>
                        <div className="mainBillboard-ImgDiv">
                            <div>
                                <Image  className="mainBillboard-Img" alt="" src={BillboardImg3}/>
                            </div>
                            <div className="text-Div">
                                <h4 style={{fontSize:"30px"}}>Spring bread</h4>
                                <button className="lineButton">shop now</button>
                            </div>
                        </div>
                    </div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:"20px"}}>
                        <div className="mainBillboard-ImgDiv mainBillboard-row">
                            <div>
                                <Image  className="mainBillboard-Img" alt="" src={BillboardImg4}/>
                            </div>
                            <div className="text-Div">
                                <h4 style={{fontSize:"30px"}}>Spring bread</h4>
                                <button className="lineButton">shop now</button>
                            </div>
                        </div>
                        <div className="mainBillboard-ImgDiv mainBillboard-row">
                            <div>
                                <Image className="mainBillboard-Img" alt="" src={BillboardImg5}/>
                            </div>
                            <div className="text-Div">
                                <h4 style={{fontSize:"30px"}}>Up to 40% off</h4>
                                <button className="lineButton">shop now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="TrendingWrapper">
                <div className="TrendingContainer">
                    <div className="TrendingDiv-header">
                        <h3>trend collection</h3>
                        <div style={{display:"flex",alignItems:"center", gap:"20px"}}>
                            <button className="lineButton">view all collections</button>
                            <div style={{display:"flex",gap:"20px"}}>
                                <button className="slider-Button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                </button>
                                <button className="slider-Button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Trending-Wrapper">
                        <div className="Trending-Container">
                            <div className="Item">
                                <div style={{position:"relative"}}>
                                    <Image className="T-Img" alt="" height={500} width={500} src={ManTrending}/>
                                    <Image className="T-Img2" alt="" height={500} width={500} src={ManTrending2}/>
                                </div>
                                <div style={{textAlign:"center", fontSize:"30px"}}>
                                    <h3>Man</h3>
                                </div>
                            </div>
                            <div className="Item">
                                <div>
                                    <Image className="T-Img" alt="" height={500} width={500} src={WomanTrending}/>
                                </div>
                                <div style={{textAlign:"center", fontSize:"30px"}}>
                                        <h3>Woman</h3>
                                </div>
                            </div>
                            <div className="Item">
                                <div>
                                    <Image className="T-Img" alt="" height={500} width={500} src={KidsTrending}/>
                                </div>
                                <div style={{textAlign:"center", fontSize:"30px"}}>
                                    <h3>Kid</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;