'use client'
import Image from "next/image";
import '../../assets/css/homePage.css';
import { useEffect, useState } from 'react';
import img1 from '../../assets/img/homePageImg/clothing-1.png';
import img2 from '../../assets/img/homePageImg/clothing-2.png';
import img3 from '../../assets/img/homePageImg/clothing-3.png';
import img4 from '../../assets/img/homePageImg/clothing-4.png';
import img5 from '../../assets/img/homePageImg/clothing-5.png';
const imgArray = [img1, img2, img3, img4, img5]
export default function MainSwiper({data}){
    const sliderToShow = 3; // Number of slides to show
    var width = 100 / sliderToShow;
    const extendedArray = [
        data[data.length - 1],
        ...data,
        data[0]
    ];
    const [sliderState, setSliderState] = useState({
        array:extendedArray,
        transferX:-width,
        middleSlider: 2,
        transitioning: false
    });

    function handlePrevClick() {
        if (sliderState.middleSlider === 1) {
            debugger
            setTimeout(() => {
                let index1 = data.length - 2;
                // let newArray =  [...sliderState.array.slice(index1 - 1, sliderState.array.length), ...sliderState.array.slice(0, index1)];
                setSliderState((prev)=>({
                    // array:newArray,
                    ...prev,
                    transferX:-width * (extendedArray.length - 3),
                    middleSlider: extendedArray.length -2,
                    transitioning: false,
                }))
            }, 500);

        }
        else{
            setSliderState((prev) => ({
                ...prev,
                transferX: prev.transferX + width,
                middleSlider: prev.middleSlider - 1,
                transitioning: true
            }))
        }
    }


    function handleNextClick() {
        if (sliderState.middleSlider == sliderState.array.length - 2) {
            debugger
            setTimeout(() => {
                let index1 = data.length - 2;
                // let newArray =  [...sliderState.array.slice(index1 - 1, sliderState.array.length), ...sliderState.array.slice(0, index1)];
                setSliderState((prev)=>({
                    // array:newArray,
                    ...prev,
                    transferX:0,
                    middleSlider: 1,
                    transitioning: false,
                }))
            }, 500);

        }
        else{
            setSliderState((prev) => ({
                ...prev,
                transferX: prev.transferX - width,
                middleSlider: prev.middleSlider + 1,
                transitioning: true
            }))
        }
    }

    return(
        <div className="main-Slider">
            <div className="home__circle">
                <div className="home__subcircle"></div>
                <h1 className="home__title">GCG</h1>
            </div>
            <div className="swiper">
                <div className="swiper-wrapper"
                style={{
                        transform: `translate3d(${sliderState.transferX}%, 0, 0)`,
                        transition: sliderState.transitioning ? 'transform 0.5s ease' : 'none'
                    }}>
                    {
                        sliderState.array.length > 0 &&(
                            sliderState.array.map((element, index)=>{
                                return(
                                <div key={index}
                                className={`slider ${sliderState.middleSlider == index ? "centralSlide": "sideSlide"}`}>
                                    <Image
                                        layout="fill"
                                        className="home__img" src={element.images[0]}  alt="" />
                                </div>)
                            })
                        ) 
                    }
                </div>
                <div className="MainSlider-navigation">
                    <p onClick={(e)=>{handlePrevClick()}} aria-label="Previous Slide">&#11144;</p>
                    <label>Name</label>
                    <p onClick={(e)=>{handleNextClick()}} id="nextSlide" aria-label="Next Slide">&#11146;</p>
                </div>
            </div>
        </div>
    )
}