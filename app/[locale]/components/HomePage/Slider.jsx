
'use client'
import Image from "next/image";
import { useState } from "react";

import ManTrending from "../../assets/img/homePageImg/Trending/Man/ManTrending.png"
import ManTrending2 from "../../assets/img/homePageImg/Trending/Man/ManTrending2.png"
import ManTrending3 from "../../assets/img/homePageImg/Trending/Man/ManTrending3.png"
import ManTrending4 from "../../assets/img/homePageImg/Trending/Man/ManTrending4.png"
import ManTrending5 from "../../assets/img/homePageImg/Trending/Man/ManTrending5.png"
import ManTrending6 from "../../assets/img/homePageImg/Trending/Man/ManTrending6.png"
import ManTrending7 from "../../assets/img/homePageImg/Trending/Man/ManTrending7.png"
import ManTrending8 from "../../assets/img/homePageImg/Trending/Man/ManTrending8.png"

export default function Slider(){
    const [sliderState, setSliderState] = useState({
        clickAmount: 0,
        transferX:0
    });
    const sliderToShow = 3; // Number of slides to show
    // const trending = props.obj;
    // let clickAmount = trending.length - sliderToShow;

    let clickAmount = 4 - sliderToShow;

    function handleNextClick() {
        if (sliderState.clickAmount < clickAmount) {
            var width = 100 / sliderToShow;
            setSliderState({
                clickAmount: ++sliderState.clickAmount,
                transferX: sliderState.transferX + width
            })
        }
    }

    function handlePrevClick() {
        ///test
        if (sliderState.clickAmount > 0) {
            var width = 100 / sliderToShow;
            setSliderState({
                clickAmount: --sliderState.clickAmount,
                transferX: sliderState.transferX - width
            })
        }
    }
    return(
        <div className="TrendingWrapper">
        <div className="TrendingContainer">
            <div className="TrendingDiv-header">
                <h3>trend collection</h3>
                <div style={{textAlign:"center", justifyContent:"flex-start", fontSize:"15px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <button className="lineButton">Man</button>
                    <button className="lineButton">Woman</button>
                    <button className="lineButton">Kid</button>
                </div>
                <div style={{display:"flex",alignItems:"center", gap:"20px"}}>
                    <button className="lineButton">view all collections</button>
                </div>
            </div>
            <div className="Trending-Wrapper">
                <div className="Trending-Container"
                    style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`}}>
                    <div style={{flex: `0 0 calc(100% / ${sliderToShow})`}} className="Item">
                        <div style={{position:"relative"}}>
                            <Image className="T-Img" alt="" height={500} width={500} src={ManTrending}/>
                            <Image className="T-Img2" alt="" height={500} width={500} src={ManTrending2}/>
                        </div>
                    </div>
                    <div style={{flex: `0 0 calc(100% / ${sliderToShow})`}} className="Item">
                        <div style={{position:"relative"}}>
                            <Image className="T-Img" alt="" height={500} width={500} src={ManTrending3}/>
                            <Image className="T-Img2" alt="" height={500} width={500} src={ManTrending4}/>
                        </div>
                    </div>
                    <div style={{flex: `0 0 calc(100% / ${sliderToShow})`}} className="Item">
                        <div style={{position:"relative"}}>
                            <Image className="T-Img" alt="" height={500} width={500} src={ManTrending5}/>
                            <Image className="T-Img2" alt="" height={500} width={500} src={ManTrending6}/>
                        </div>
                    </div>
                    <div style={{flex: `0 0 calc(100% / ${sliderToShow})`}} className="Item">
                        <div style={{position:"relative"}}>
                            <Image className="T-Img" alt="" height={500} width={500} src={ManTrending7}/>
                            <Image className="T-Img2" alt="" height={500} width={500} src={ManTrending8}/>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:"flex",gap:"60px", justifyContent:"center"}}>
                <button onClick={handlePrevClick} className="slider-Button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <button onClick={handleNextClick} className="slider-Button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    )
}