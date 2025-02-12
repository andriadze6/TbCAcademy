'use client'

import Link from 'next/link'
import useSlider from '../../hooks/changeSlider'
import Image from "next/image";
import {useAuth} from "../../../providers/UserSessionProvider";



export default function Slider({data,sliderToShow}) {
    const {user}  = useAuth();
   async function AddToWishList(productID, colorID) {
    debugger
        if(user){
            const response = fetch("/api/AddToWishList", {
                method: "POST",
                body: JSON.stringify({user_ID: user.id, product_ID: productID, color_ID: colorID}),
            })
        }
        else{
        }
    }
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
                                    <div className="popUpContent">
                                        <button className="cardButton" onClick={() => { AddToWishList(element.product_ID, element.color_ID)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </button>
                                        <button className="cardButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
