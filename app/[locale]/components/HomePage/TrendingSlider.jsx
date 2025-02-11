
'use client'
import Image from "next/image";
import { useState } from "react";
import useSlider from '../../hooks/changeSlider'


import ManTrending from "../../assets/img/homePageImg/Trending/Man/ManTrending.png"
import ManTrending2 from "../../assets/img/homePageImg/Trending/Man/ManTrending2.png"
import ManTrending3 from "../../assets/img/homePageImg/Trending/Man/ManTrending3.png"
import ManTrending4 from "../../assets/img/homePageImg/Trending/Man/ManTrending4.png"
import ManTrending5 from "../../assets/img/homePageImg/Trending/Man/ManTrending5.png"
import ManTrending6 from "../../assets/img/homePageImg/Trending/Man/ManTrending6.png"
import ManTrending7 from "../../assets/img/homePageImg/Trending/Man/ManTrending7.png"
import ManTrending8 from "../../assets/img/homePageImg/Trending/Man/ManTrending8.png"
import Link from "next/link";

export default function Slider({man, woman, kid}){
    const[data, setData] = useState(man);
    let { sliderState, changeSlider } = useSlider(3);
    return(
        <div className="TrendingWrapper">
        <div className="TrendingContainer">
            <div className="TrendingDiv-header">
                <h3>trend collection</h3>
                <div style={{textAlign:"center", justifyContent:"flex-start", fontSize:"15px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <button className="lineButton" onClick={()=>setData(man)}>Man</button>
                    <button className="lineButton" onClick={()=>setData(woman)}>Woman</button>
                    <button className="lineButton" onClick={()=>setData(kid)}>Kid</button>
                </div>
                <div style={{display:"flex",alignItems:"center", gap:"20px"}}>
                    <button className="lineButton">view all collections</button>
                </div>
            </div>
            <div className="TSlider-Wrapper">
                <div className="TSlider-Container"
                    style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`}}>
                    {
                        data.length > 0 && data.map((item, index) =>{
                            return(
                                <Link href={`/ProductPage/${item.product_ID}/${item.color_ID}`} key={item.color_ID} style={{flex: `0 0 calc(100% / ${3})`}} className="Item">
                                    <div style={{position:"relative",borderRadius:"10px"}}>
                                        {
                                            item.imageURL && item.imageURL.length > 0 &&
                                            <>
                                                <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className="T-Img" alt="" height={500} width={500} src={item.imageURL[0]}/>
                                                <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className="T-Img2" alt="" height={500} width={500} src={item.imageURL[1]}/>
                                            </>
                                        }
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div style={{display:"flex",gap:"60px", justifyContent:"center"}}>
                <button onClick={()=>{changeSlider(0,3,4)}} className="slider-Button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <button onClick={()=>{changeSlider(1,3,4)}} className="slider-Button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    )
}