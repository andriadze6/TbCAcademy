
'use client'
import '../assets/css/productPage.css'
import useSlider from '@/app/hooks/changeSlider'
import Image from 'next/image'
import img from '../assets/img/homePageImg/NewArrival/NewArrival1-1.png';
import img2 from '../assets/img/homePageImg/NewArrival/NewArrival1-2.png';
import img3 from '../assets/img/homePageImg/NewArrival/NewArrival2-2.png';
import img4 from '../assets/img/homePageImg/NewArrival/NewArrival2-1.png';
import img5 from '../assets/img/homePageImg/NewArrival/NewArrival3-1.png';


export default function ProductPage() {
    let { sliderState, changeSlider } = useSlider(1);
    return (
        <div className="wrapper">
            <div className="container">
                <div className="Image-Div">
                    <div className="image-nav">
                        <div className='navImgDiv'>
                            <Image width={500} height={500} src={img} alt="" />
                        </div>
                        <div className='navImgDiv'>
                            <Image width={500} height={500} src={img2} alt="" />
                        </div>
                        <div className='navImgDiv'>
                            <Image width={500} height={500} src={img3} alt="" />
                        </div>
                        <div className='navImgDiv'>
                            <Image width={500} height={500} src={img4} alt="" />
                        </div>
                        <div className='navImgDiv'>
                            <Image width={500} height={500} src={img5} alt="" />
                        </div>
                    </div>
                    <div className="slider-wrapper">
                        <div className='Slider-container'style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`}}>
                                <div style={{display:"flex"}}>
                                    <div className="SliderDiv" style={{flex: `0 0 calc(100% / ${3})`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img} alt="" />
                                    </div>
                                </div>
                                <div className='slider-ButtonDiv'>
                                        <button onClick={()=>{changeSlider(0)}} className="slider-Button">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                            </svg>
                                        </button>
                                        <button onClick={()=>{changeSlider(1)}} className="slider-Button">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                            </svg>
                                        </button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="Information">
                </div>
            </div>
        </div>
    )
}