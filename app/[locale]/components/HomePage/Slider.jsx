'use client'

import Link from 'next/link'
import useSlider from '../../hooks/changeSlider'
import Image from "next/image";
import {useAuth} from "../../../providers/UserSessionProvider";



export default function Slider({data,sliderToShow}) {
    const {user, AddToWishList}  = useAuth();
    let { sliderState, changeSlider } = useSlider(sliderToShow);
    return(
        <div className="sliderWrapper">
            <div style={{display:"flex",justifyContent:"space-between", marginBottom:"20px", paddingLeft:"20px", paddingRight:"20px"}} className='new-Arrival'>
                <h2>New Arrival</h2>
                <div style={{display:"flex",gap:"60px", justifyContent:"center"}}>
                    <button onClick={()=>{changeSlider(0, 3, 4)}} className="slider-Button">
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
            <div className="sliderContainer"
            style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`, transition:"transform 0.5s ease-in-out"}}>
                <div style={{display:"flex"}}>

                    {
                        data.length > 0 && data.map((element, index)=>{
                            return(
                                <div key={element.color_ID} className="SliderItem" style={{flex: `0 0 calc(100% / ${3})`, position:"relative"}}>
                                    <Link  href={`/ProductPage/${element.product_ID}/${element.color_ID}`} >
                                        <div  className='SliderImgDiv' style={{position:"relative"}}>
                                            <div>
                                                {
                                                    element.imageURL && element.imageURL.length > 0 &&
                                                    <>
                                                        <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className="S-Img" alt="" height={500} width={500} src={element.imageURL[0]}/>
                                                        <Image style={{borderRadius:"10px",border:"1px solid #ccc", overflow:"hidden"}} className="S-Img2" alt="" height={500} width={500} src={element.imageURL[1]}/>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
