
'use client'
import '../../../assets/css/productPage.css'
import useSlider from '../../../hooks/changeSlider'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import {useTranslations, useLocale } from 'next-intl';
import{useParams} from 'next/navigation'
let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"]

const initialState = {
    globalProductInfo: {},
    productColors: [],
    productStock: [],
    images: [],
    navImages: [],
    sliderImages: [],
    imageAmount:0
};
export default function ProductPage() {
    const [productData, setProductData] = useState(initialState);
    const { sliderState, changeSlider, skipSlider } = useSlider();
    const { ID, colorID } = useParams();
    const [size, setSize] = useState(null);
    const [amount, setAmount] = useState(1);
    const currentLanguage = useLocale();

    useEffect(() => {
        (async function fetchProductData() {
            try {
                const response = await fetch('/api/GedProductByID', {
                    method: 'POST',
                    body: JSON.stringify({ id: ID }),
                });
                const data = await response.json();
                if(!data.error){
                    const { navImages, sliderImages, imageAmount, } = createSlider(data.images,colorID);
                    console.log(data)
                    setProductData({
                        globalProductInfo: data.globalProductInfo[0],
                        productColors: data.productColors,
                        productStock: data.productStock,
                        images: data.images,
                        currentColorID:colorID,
                        navImages,
                        sliderImages,
                        imageAmount
                    });
                }

            }catch (error) {
                console.log(error)
            }
        })();
    },[ID]); ///ID უნდა იყოს დამოკიდებული

    function createSlider(imagesArray, cID) {
        const navImages = [];
        const sliderImages = [];
        let imageAmount = 0;
        imagesArray.forEach((color) => {
            if (color.productColorID === cID) {
                imageAmount = color.imageURL.length
                color.imageURL.forEach((url, imgIndex) => {
                    navImages.push(
                        <div
                            key={`${color.productColorID}-nav-${imgIndex}`}
                            onClick={() => skipSlider(imgIndex, 1)}
                            className="navImgDiv">
                            <Image
                                className={`navImg`}
                                width={500}
                                height={500}
                                src={url}
                                priority
                                alt=""
                            />
                        </div>
                    );
                    sliderImages.push(
                        <div
                            key={`${color.productColorID}-slider-${imgIndex}`}
                            className="SliderDiv"
                            style={{ flex: `0 0 100%` }}>
                            <Image
                                className="sliderImg"
                                width={700}
                                height={700}
                                src={url}
                                priority
                                alt=""/>
                        </div>
                    );
                });
            }
        });
        return { navImages, sliderImages, imageAmount};
    }

    function Slider({ navImages, sliderImages, imageAmount}) {
        return (
            <div className="Image-Div">
                <div className="image-nav">{navImages}</div>
                <div className="slider-wrapper">
                    <div className="Slider-container"
                        style={{ transform: `translate3d(-${sliderState.transferX}%, 0, 0)` }}>
                        <div style={{ display: 'flex' }}>{sliderImages}</div>
                    </div>
                    <div className='slider-ButtonDiv'>
                            <button onClick={()=>{changeSlider(0,1,imageAmount)}} className="slider-Button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </button>
                            <button onClick={()=>{changeSlider(1,1,imageAmount)}} className="slider-Button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                    </div>
                </div>
            </div>
        );
    }

    function ProductInfo({ productInfo, currentLanguage, amount, changeAmount }) {
        const { title_en, title_ge, description_en, description_ge } = productInfo;
        return (
            <div className="information-Div">
                <div className="information-Container">
                    <h1 className="information-Title bottom_Margin">
                        {currentLanguage === 'en' ? title_en : title_ge}
                    </h1>
                    <p className="bottom_Margin">
                        {currentLanguage === 'en' ? description_en : description_ge}
                    </p>
                    <div className='bottom_Margin size_Div'>
                        {

                        }
                        <div style={{display:"flex", gap:"20px"}}>
                            <h4 style={{marginBottom:"10px"}}>price:</h4>
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
                        </div>
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
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }} className="bottom_Margin">
                        <div className="select-Amount">
                            <button onClick={() => changeAmount(-1)} className="select-Amount-Button">-</button>
                            <h5 className="select-Amount-Number">{amount}</h5>
                            <button onClick={() => changeAmount(1)} className="select-Amount-Button">+</button>
                        </div>
                        <div className="addToCart" style={{ width: '100%' }}>
                            <button className="addToCart-Button">Add to cart</button>
                        </div>
                    </div>
                    <div className="bottom_Margin">
                        <button className="buyNow-Button">Buy now</button>
                    </div>
                </div>
            </div>
        );
    }
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
            {
                productData.images.length > 0 &&
                <div className="container">
                <Slider
                    navImages={productData.navImages}
                    sliderImages={productData.sliderImages}
                    imageAmount={productData.imageAmount}/>
                <div className='information-Div'>
                    <div className='information-Container'>
                        <h1 className='information-Title bottom_Margin'>
                            {currentLanguage === "en" ? productData.globalProductInfo.title_en :productData.globalProductInfo.title_ge}
                        </h1>
                        <p className='bottom_Margin'>{currentLanguage === "en" ? productData.globalProductInfo.description_en :productData.globalProductInfo.description_ge}</p>
                    </div>

                    {
                        size != null &&
                        <div style={{display:"flex", gap:"20px"}}>
                        <h4 style={{marginBottom:"10px"}}>price:</h4>
                            <div className='bottom_Margin' style={{display:"flex",gap:"20px"}}>
                                    <div className='current-Price' style={{display:"flex"}}>
                                        <h3 className='product-currency'>₾</h3>
                                        <h3 className='product-Price'>{productData.productStock[productData.currentColorID][size].price_lari}</h3>
                                    </div>
                                    {/* <div style={{display:"flex", gap:"20px"}}>
                                        <div className='old-Price' style={{display:"flex"}}>
                                            <h3 className='product-currency'>₾</h3>
                                            <h3 className='product-Price'>400</h3>
                                        </div>
                                        <div className='discount_Percentage'>
                                            <h5>-50%</h5>
                                        </div>
                                    </div> */}
                            </div>
                        </div>
                    }
                    <div className='bottom_Margin color_Div'>
                            <h4 style={{marginBottom:"10px"}}>Colors:</h4>
                            <div className='color-Container'>
                            {
                                productData.images.map((item, index) => {
                                    return (
                                        <button key={index} onClick={() => { skipSlider(index) }} className='color_Img_Button'>
                                            <Image  className={`color_Img ${index === sliderState.clickAmount ? "border" : ""}`} width={500} height={500} src={item.isPrimary} alt="" />
                                        </button>
                                    )
                                })
                            }
                            </div>
                    </div>
                    <div className='bottom_Margin size_Div'>
                            <div className='size-Container'>
                                {
                                    Object.entries(productData.productStock[productData.currentColorID]).map(([key, value], index)=>{
                                        return (
                                            <button
                                            style={size != key ? {border:"1px solid rgba(163, 192, 200, 0.771)"}:{border:"1px solid rgba(178,1,14,0.6671043417366946)"}}
                                             onClick={()=>setSize(key)}
                                            className='size_Button' key={`${value.productStockID}`}>{key}</button>
                                        )
                                    })
                                }
                            </div>
                    </div>
                </div>
                {/* <div className="information-Div">
                    <div className='information-Container'>
                        <h1 className='information-Title bottom_Margin'>
                        {currentLanguage === "en" ? globalProductInfo.title_en : globalProductInfo.title_ge}
                    </h1>
                    <p className='bottom_Margin'>{currentLanguage === "en" ? globalProductInfo.description_en : globalProductInfo.description_ge}</p>
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
                            <div style={{display:"flex", gap:"20px"}}>
                                <h4 style={{marginBottom:"10px"}}>price:</h4>
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
                            </div>
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
                </div> */}
            </div>
            }
        </div>
    )
}