
'use client'
import '../../assets/css/productPage.css'
import useSlider from '../../hooks/changeSlider'
import Image from 'next/image'
import img from '../../assets/img/homePageImg/NewArrival/NewArrival1-1.png';
import img2 from '../../assets/img/homePageImg/NewArrival/NewArrival1-2.png';
import img3 from '../../assets/img/homePageImg/NewArrival/NewArrival2-2.png';
import img4 from '../../assets/img/homePageImg/NewArrival/NewArrival2-1.png';
import img5 from '../../assets/img/homePageImg/NewArrival/NewArrival3-1.png';
import { useState } from 'react';
import{useParams} from 'next/navigation'

let imgArray = [img, img2, img3, img4, img5]


let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"]
export default function ProductPage() {
    debugger
    let {  sliderState, changeSlider,  skipSlider } = useSlider(1, 5);
    let [amount, setAmount] = useState(1)
    const {id} = useParams()
    function changeAmount(n) {
        setAmount((prev)=>{
            let cAmount = prev + n;
            if (cAmount < 1) {
                cAmount = 1
            }
            return cAmount
        })
    }
    return (
        <div className="wrapper">
            <div className="container">
                <div className="Image-Div">
                    <div className="image-nav">
                        {
                            imgArray.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { skipSlider(index) }} className='navImgDiv'>
                                        <Image className={`navImg ${index === sliderState.clickAmount ? "border" : ""}`} width={500} height={500} src={item} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="slider-wrapper">
                        <div className='Slider-container'style={{transform:`translate3d(-${sliderState.transferX}%, 0, 0)`}}>
                                <div style={{display:"flex"}}>
                                    <div className="SliderDiv" style={{flex: `0 0 100%`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img} alt="" />
                                    </div>
                                    <div className="SliderDiv" style={{flex: `0 0 100%`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img2} alt="" />
                                    </div>
                                    <div className="SliderDiv" style={{flex: `0 0 100%`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img3} alt="" />
                                    </div>
                                    <div className="SliderDiv" style={{flex: `0 0 100%`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img4} alt="" />
                                    </div>
                                    <div className="SliderDiv" style={{flex: `0 0 100%`}}>
                                        <Image className='sliderImg' width={700} height={700} src={img5} alt="" />
                                    </div>
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
                <div className="information-Div">
                    <div className='information-Container'>
                        <h1 className='information-Title bottom_Margin'>Regular-fit linen cotton shirt</h1>
                        <div className='bottom_Margin' style={{display:"flex",gap:"20px"}}>
                            <div className='current-Price' style={{display:"flex"}}>
                                <h3 className='product-currency'>₾</h3>
                                <h3 className='product-Price'>200</h3>
                            </div>
                            <div style={{display:"flex", gap:"20px"}}>
                                <div className='old-Price' style={{display:"flex"}}>
                                    <h3 className='product-currency'>₾</h3>
                                    <h3 className='product-Price'>400</h3>
                                </div>
                                <div className='discount_Percentage'>
                                    <h5>-50%</h5>
                                </div>
                            </div>
                        </div>
                        <p className='bottom_Margin'>Casual styling and precious details come together in this stretch cotton ribbed jersey top. The cropped silhouette pairs perfectly with the casual feel of ribbing, while the deep V-neck is enriched with an embroidery of fine rows of precious monili, completing the look of the top with a very feminine sparkling note.</p>
                        <div className='bottom_Margin color_Div'>
                            <h4 style={{marginBottom:"10px"}}>Color:</h4>
                            <div className='color-Container'>
                            {
                                imgArray.map((item, index) => {
                                    return (
                                        <button key={index} onClick={() => { skipSlider(index) }} className='color_Img_Button'>
                                            <Image className={`color_Img ${index === sliderState.clickAmount ? "border" : ""}`} width={500} height={500} src={item} alt="" />
                                        </button>
                                    )
                                })
                            }
                            </div>
                        </div>
                        <div className='bottom_Margin size_Div'>
                            <h4 style={{marginBottom:"10px"}}>Color:</h4>
                            <div className='size-Container'>
                                {
                                    sizeArray.map((item, index) => {
                                        return (
                                            <button className='size_Button' key={index}>{item}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='bottom_Margin size-chart'>
                                <button className='size-chart-Button'>Size chart</button>
                        </div>
                        <div style={{display:"flex",gap:"20px", alignItems:"center", width:"100%"}} className='bottom_Margin'>
                            <div className='select-Amount'>
                                <button onClick={()=>{changeAmount(-1)}} className='select-Amount-Button'>-</button>
                                <h5 className='select-Amount-Number'>{amount}</h5>
                                <button onClick={()=>{changeAmount(1)}} className='select-Amount-Button'>+</button>
                            </div>
                            <div className='addToCart' style={{width:"100%"}}>
                                <button className='addToCart-Button'>
                                    <svg className='addToCart-Icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                Add to cart</button>
                            </div>
                        </div>
                        <div className='bottom_Margin'>
                            <button className='buyNow-Button'>Buy now</button>
                        </div>

                        <div className='bottom_Margin product-Details-Div'>
                            <h4 style={{marginBottom:"10px"}}>Product details</h4>
                            <ul className='product-Details-list'>
                                <li>Material : 100% Cotton</li>
                                <li>Product Dimensions : 13 x 8 x 1 inches; 3.84 Ounces</li>
                                <li>Item model number : GT9337</li>
                                <li>Department : women</li>
                            </ul>
                        </div>

                        <div className='bottom_Margin delivery-Div'>
                            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"/></svg>
                                <h5>Free Shipping & Returns: On all orders over $200</h5>
                            </div>
                            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z"/></svg>
                                <h5>Estimate delivery times: 3-6 days (international)( 27 )</h5>
                            </div>
                            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/></svg>                                
                                <h5>Estimate delivery times: 3-6 days (international)( 27 )</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}