import Image from "next/image";
import "../../assets/css/NewHomePage.css";
import { createClient } from '../../../../utils/supabase/server';

import BillboardImg1 from "../../assets/img/homePageImg/NewHomePage/Header-Img1.png"
import BillboardImg2 from "../../assets/img/homePageImg/NewHomePage/Header-Img2.png"
import BillboardImg3 from "../../assets/img/homePageImg/NewHomePage/Header-Img3.png"
import BillboardImg4 from "../../assets/img/homePageImg/NewHomePage/Header-Img4.png"
import BillboardImg5 from "../../assets/img/homePageImg/NewHomePage/Header-Img5.png"
import KidsTrending from "../../assets/img/homePageImg/Trending/Kids.png"

import TrendingSlider from "./TrendingSlider";
import WomanTrending from "../../assets/img/homePageImg/Trending/WomanTrend.png"

import SwimWear from '../../assets/img/homePageImg/NewHomePage/SwimWear.png'
import Link from "next/link";

import MainBanner from '../../assets/img/homePageImg/NewArrival/MainBanner.png'

import Slider from "../HomePage/Slider";

async function getProduct() {
    const result = {
        man:[],
        woman:[],
        kid:[],
    }
    const supabase = await createClient();
    let { data: Trending, error } = await supabase
    .from('Trending')
    .select('*')

    if (error) {
        throw new Error(error);
    }
    for (let i = 0; i < Trending.length; i++) {
        const [GlobalProductInfoResult, productColorsResult,productStockResult, imagesResult] = await Promise.all([
            supabase
            .from('GlobalProductInfo')
            .select('*')
            .eq('product_id', Trending[i].product_ID),
            supabase.from('productColors')
            .select('*')
            .eq('productColorID', Trending[i].color_ID),
            supabase
                .from('productStock')
                .select("*")
                .eq('product_ColorID', Trending[i].color_ID),
            supabase
                .from('Images')
                .select('imageURL, productColorID, isPrimary')
                .eq("productColorID", Trending[i].color_ID)
        ]);
        if (GlobalProductInfoResult.error) {
            throw new Error(GlobalProductInfoResult.error.message);
        }
        if (productColorsResult.error) {
            throw new Error(productColorsResult.error.message);
        }
        if (productStockResult.error) {
            throw new Error(productStockResult.error.message);
        }
        if (imagesResult.error) {
            throw new Error(imagesResult.error.message);
        }
        if(GlobalProductInfoResult.data[0].gender === "man"){
            result.man.push({...GlobalProductInfoResult.data[0],...productColorsResult.data[0],...productStockResult.data[0],...imagesResult.data[0]})
        }
        else if(GlobalProductInfoResult.data[0].gender === "woman"){

            result.woman.push({...GlobalProductInfoResult.data[0],...productColorsResult.data[0],...productStockResult.data[0],...imagesResult.data[0]})
        }
        else{
            result.kid.push({...GlobalProductInfoResult.data[0],...productColorsResult.data[0],...productStockResult.data[0],...imagesResult.data[0]})
        }
    }
    return result
}

async function HomePage(){
    let result  = await getProduct();
    console.log(result);
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
            <TrendingSlider man={result.man} woman={result.woman} kid={result.kid}></TrendingSlider>
            <div className="BannerWrapper">
                <div className="BannerContainer">
                    <Link className="mainBanner" href='/'>
                        <div className="mainBanner-ImgDiv">
                            <Image height={500} width={500} alt="" src={MainBanner}/>
                        </div>
                        <button className="exploreButton">Explore</button>
                    </Link>
                <div style={{display:"flex", gap:"20px", alignItems:"center", width:"70%"}}>
                    <Slider></Slider>
                </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;