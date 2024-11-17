'use client'

import NewArrival11 from '../../assets/img/homePageImg/NewArrival/NewArrival1-1.png'
import NewArrival12 from '../../assets/img/homePageImg/NewArrival/NewArrival1-2.png'
import NewArrival21 from '../../assets/img/homePageImg/NewArrival/NewArrival2-1.png'
import NewArrival22 from '../../assets/img/homePageImg/NewArrival/NewArrival2-2.png'
import NewArrival31 from '../../assets/img/homePageImg/NewArrival/NewArrival3-1.png'
import NewArrival32 from '../../assets/img/homePageImg/NewArrival/NewArrival3-2.png'
import NewArrival41 from '../../assets/img/homePageImg/NewArrival/NewArrival4-1.png'
import NewArrival42 from '../../assets/img/homePageImg/NewArrival/NewArrival4-2.png'

import useSlider from '@/app/hooks/changeSlider'
import Image from "next/image";


export default function Slider(){
    let { sliderState, changeSlider } = useSlider(3);
    return(
        <div>
            <div className="sliderWrapper">

                <div className="sliderContainer"
                style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`}}>
                <div style={{display:"flex"}}>
                    <div className="SliderItem" style={{flex: `0 0 calc(100% / ${3})`}}>
                        <div className='SliderImgDiv' style={{position:"relative"}}>
                            <div>
                                <Image className="S-Img" alt="" height={500} width={500} src={NewArrival11}/>
                                <Image className="S-Img2" alt="" height={500} width={500} src={NewArrival12}/>
                            </div>
                            <div className="popUpContent">
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <h3>Classic vest jacket</h3>
                            <div style={{display:"flex", gap:"20px", justifyContent:"center", alignItems:"center"}}>
                                <div>
                                    <span>$<span>250</span></span>
                                </div>
                                <div style={{ display: "flex", gap:"20px", alignItems: "center", color: "#c1121f"}}>
                                    <span className="strike-center">$<span>350</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SliderItem" style={{flex: `0 0 calc(100% / ${3})`}} >
                        <div className='SliderImgDiv'  style={{position:"relative"}}>
                            <div>
                                <Image className="S-Img" alt="" height={500} width={500} src={NewArrival41}/>
                                <Image className="S-Img2" alt="" height={500} width={500} src={NewArrival42}/>
                            </div>
                            <div className="popUpContent">
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <h3>Classic vest jacket</h3>
                            <div style={{display:"flex", gap:"20px", justifyContent:"center", alignItems:"center"}}>
                                <div>
                                    <span>$<span>250</span></span>
                                </div>
                                <div style={{ display: "flex", gap:"20px", alignItems: "center", color: "#c1121f"}}>
                                    <span className="strike-center">$<span>350</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SliderItem" style={{flex: `0 0 calc(100% / ${3})`}} >
                        <div className='SliderImgDiv'  style={{position:"relative"}}>
                            <div>
                                <Image className="S-Img" alt="" height={500} width={500} src={NewArrival21}/>
                                <Image className="S-Img2" alt="" height={500} width={500} src={NewArrival22}/>
                            </div>
                            <div className="popUpContent">
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <h3>Classic vest jacket</h3>
                            <div style={{display:"flex", gap:"20px", justifyContent:"center", alignItems:"center"}}>
                                <div>
                                    <span>$<span>250</span></span>
                                </div>
                                <div style={{ display: "flex", gap:"20px", alignItems: "center", color: "#c1121f"}}>
                                    <span className="strike-center">$<span>350</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SliderItem" style={{flex: `0 0 calc(100% / ${3})`}} >
                        <div className='SliderImgDiv'  style={{position:"relative"}}>
                            <div>
                                <Image className="S-Img" alt="" height={500} width={500} src={NewArrival31}/>
                                <Image className="S-Img2" alt="" height={500} width={500} src={NewArrival32}/>
                            </div>
                            <div className="popUpContent">
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button className="cardButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <h3>Classic vest jacket</h3>
                            <div style={{display:"flex", gap:"20px", justifyContent:"center", alignItems:"center"}}>
                                <div>
                                    <span>$<span>250</span></span>
                                </div>
                                <div style={{ display: "flex", gap:"20px", alignItems: "center", color: "#c1121f"}}>
                                    <span className="strike-center">$<span>350</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
