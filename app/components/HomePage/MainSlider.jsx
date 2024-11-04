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
    let clickAmount = data.length - 3;
    const [sliderState, setSliderState] = useState({
        array:data,
        firstElement: 0,
        transferX:0,
        middleSlider: 1
    });
    function handleNextClick() {
        var width = 100 / sliderToShow;
        let newFirstElement = sliderState.firstElement;
        let lastElement = newFirstElement + 4;
        let newArray = data.slice(newFirstElement, lastElement)
        newFirstElement++; 
        setSliderState((prev) => ({
            array: newArray,
            firstElement: newFirstElement,
            transferX: prev.transferX -width,
            middleSlider: 2,
        }))
        // if(clickAmount == sliderState.clickAmount){
        //     let index1 = data.length -2
        //     setSliderState((prev)=>({
        //         array:[...prev.array.slice(index1, prev.array.length), ...prev.array.slice(0, index1)],
        //         clickAmount: 0,
        //         transferX: 0,
        //         middleSlider: 1
        //     }))
        // }else{
        //     setSliderState((prev) => ({
        //         array: prev.array,
        //         clickAmount: prev.clickAmount + 1,
        //         transferX: prev.transferX - width,
        //         middleSlider: prev.middleSlider + 1
        //     }))
        // }
    }

    function handlePrevClick() {
        var width = 100 / sliderToShow;
        if(false){
            let index1 = data.length - 2
            let array1 = [...data.slice(index1, imgArray1.length), ...data.slice(0, index1)]
            setSliderState({
                array:array1,
                clickAmount: 0,
                transferX: 0,
                middleSlider: 1
            })
        }else{
            setSliderState({
                array:data,
                clickAmount: --sliderState.clickAmount,
                transferX: sliderState.transferX + width,
                middleSlider: --sliderState.middleSlider
            })
        }
    } 

    return(
        <div className="main-Slider">
            <div className="home__circle">
                <div className="home__subcircle"></div>
                <h1 className="home__title">GCG</h1>
            </div>
            <div className="swiper">
                <div className="swiper-wrapper" style={{transform:`translate3d(${sliderState.transferX}%, 0, 0)`}}>
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