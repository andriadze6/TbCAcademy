
'use client'
import '../../style/productPage.css'
import useSlider from '../../../hooks/changeSlider'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import {useTranslations, useLocale } from 'next-intl';
import { useAuth } from '../../../../providers/UserSessionProvider';
import{useParams} from 'next/navigation'
import {productStockType, productColorsType, globalInfoType, ImagesType} from '../../../../Type/type'
import Tooltip from '../../../components/Tooltip';
import { set } from '@auth0/nextjs-auth0/dist/session';

const initialState = {
    globalProductInfo: {} as globalInfoType,
    productColors: [] as productColorsType[],
    productStock: [] as productStockType[],
    images: [] as ImagesType[],
    navImages: [] as string[],
    sliderImages: [] as string[],
    imageAmount:0 as number,
};
export default function ProductPage() {
    const [tooltip, setTooltip] = useState(null);
    const [productData, setProductData] = useState(initialState);
    const { sliderState, changeSlider, skipSlider } = useSlider();
    const { ID, colorID } = useParams<{ ID: string, colorID: string}>();
    const [amount, setAmount] = useState(1);
    const [selectedItem, setSelectedItem] = useState({
        productStockID: null,
        colorID:colorID as string,
        size: null,
        amount: 1,
        wishListID: null,
        cartID: null
    });
    const currentLanguage = useLocale();
    const {  user, setUser, wishList, AddToWishList, cart, AddToCart, DeleteItemFromWishList, DeleteItemFromCart  } = useAuth();

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
                        productColors: data.productColors as productColorsType[],
                        productStock: data.productStock as productStockType[],
                        images: data.images as ImagesType[],
                        navImages,
                        sliderImages,
                        imageAmount
                    });
                }

            }catch (error) {
                console.log(error)
            }
        })();
    },[ID,colorID]); ///ID უნდა იყოს დამოკიდებული

    useEffect(()=>{
        debugger
        if(selectedItem.productStockID){
            const checkWishList = wishList.find(item=>item.productStockID === selectedItem.productStockID)
            const checkCart = cart.find(item=>item.productStockID === selectedItem.productStockID)
            setSelectedItem({...selectedItem, wishListID: checkWishList?.id, cartID: checkCart?.id})
        }
    },[wishList, cart])



    function createSlider(imagesArray, cID) {
        const navImages = [];
        const sliderImages = [];
        const colorImages = [];
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
                                width={600}
                                height={600}
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

    function changeColor(colorID){
        const { navImages, sliderImages, imageAmount } = createSlider(productData.images, colorID);
        debugger
        setSelectedItem({
            ...selectedItem,
            productStockID: null,
            colorID: colorID
        })
        setProductData({
            ...productData,
            navImages,
            sliderImages,
            imageAmount
        });
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
                    <div className='slider-ButtonDiv-ProductPage'>
                        <button onClick={()=>{changeSlider(0,1,imageAmount)}} className="slider-Button-ProductPage">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>
                        <button onClick={()=>{changeSlider(1,1,imageAmount)}} className="slider-Button-ProductPage">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
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


   async function WisList(){
        if(selectedItem.productStockID){
           await AddToWishList(ID,selectedItem.colorID, selectedItem.productStockID, amount)
        }
    }
   async function DeleteWishList(){
        if(selectedItem.wishListID){
          await  DeleteItemFromCart(selectedItem.wishListID, selectedItem.productStockID)
        }
    }

    async function Cart(){
        if(selectedItem.productStockID){
            await AddToCart(ID,selectedItem.colorID, selectedItem.productStockID, amount)
        }
    }
    async function DeleteCart(){
        if(selectedItem.cartID){
            await DeleteItemFromCart(selectedItem.cartID, selectedItem.productStockID)
        }
    }

    function changeSize(productStockID:string){
        const checkWishList = wishList.find(item=>item.productStockID === productStockID)
        const checkCart = cart.find(item=>item.productStockID === productStockID)
        if(checkWishList || checkCart){
            setSelectedItem({
                ...selectedItem,
                productStockID: productStockID,
                wishListID: checkWishList?.id,
                cartID: checkCart?.id
            })
        }
        else{
            setSelectedItem({
                ...selectedItem,
                productStockID: productStockID,
                wishListID: null,
                cartID: null
            })
        }
    }
    const showTooltip = (event, text) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
          text,
          position: {
            top: rect.top + window.scrollY - 30,
            left: rect.left + window.scrollX + rect.width / 2,
          },
        });
      };
    const hideTooltip = () => {
        setTooltip(null);
      };



    function createDetails(language){
        let detail = `detail_${language}`
        let list= []
        if(productData.globalProductInfo[0][detail] != null){
            productData.globalProductInfo[detail].map((item)=>{
                list.push(<li>{item}</li>)
            })
        }
        return list
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
                    <div style={{display:"flex", gap:"20px"}}>
                        <h4 style={{marginBottom:"10px"}}>price:</h4>
                        <div className='bottom_Margin' style={{display:"flex",gap:"20px"}}>
                            {
                                selectedItem.productStockID != null ?
                                <div className='current-Price' style={{display:"flex"}}>
                                    <h3 className='product-currency'>₾</h3>
                                    <h3 className='product-Price'>{ productData.productStock[selectedItem.colorID][selectedItem.productStockID].price_lari}</h3>
                                </div>
                                : <h4 style={{marginBottom:"10px"}}>To see price choose size</h4>
                            }

                        </div>
                    </div>
                    <div className='bottom_Margin color_Div'>
                            <h4 style={{marginBottom:"10px"}}>Colors:</h4>
                            <div className='color-Container'>
                            {
                                productData.images.map((item, index) => {
                                    return (
                                        <button
                                        onClick={()=>changeColor(item.productColorID)} key={item.productColorID} className='color_Img_Button'>
                                            <Image
                                            style={selectedItem.colorID != item.productColorID ? {border:"1px solid rgba(163, 192, 200, 0.771)"}:{border:"2px solid rgba(178,1,14,0.6671043417366946)"}}
                                            className={`color_Img ${index === sliderState.clickAmount ? "border" : ""}`} width={500} height={500} src={item.isPrimary} alt="" />
                                        </button>
                                    )
                                })
                            }
                            </div>
                    </div>
                    <div className='bottom_Margin size_Div'>
                            <div className='size-Container'>
                                {
                                    Object.entries(productData.productStock[selectedItem.colorID]).map(([key, value]:[string, productStockType], index)=>{
                                        return (
                                            <button
                                            style={selectedItem.productStockID != key ? {border:"1px solid rgba(163, 192, 200, 0.771)"}:{border:"2px solid rgba(178,1,14,0.6671043417366946)"}}
                                             onClick={()=>{changeSize(value.productStockID)}}
                                            className='size_Button' key={`${value.productStockID}`}>{value.size}</button>
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
                        <div
                            style={{width:"100%"}}>
                            <button
                             style={{
                                 background: selectedItem.cartID ? "radial-gradient(circle, rgba(230,139,0,1) 9%, rgba(230,123,0,1) 50%, rgba(230,92,0,1) 100%)" : "radial-gradient(circle, rgba(76,129,144,1) 28%, rgba(40,24,52,0.9360119047619048) 100%)"
                             }}
                            onClick={selectedItem.cartID ? ()=>{DeleteCart()} : () => {Cart()}}
                            className='addToCart-Button'>
                                <svg className='addToCart-Icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            {selectedItem.cartID ? "Remove from cart" : "Add to cart"}</button>
                        </div>
                        <div
                            onMouseEnter={(e) => showTooltip(e,selectedItem.productStockID? (selectedItem.wishListID ? "Remove from wish list" : "Add to wish list") : "Choose size")}
                            onMouseLeave={hideTooltip}>
                            <button
                                className='addWishList-Button'
                                onClick={selectedItem.wishListID ? ()=>{DeleteWishList()} : ()=>{WisList()}}
                                style={{
                                    background: selectedItem.wishListID ? "radial-gradient(circle, rgba(230,139,0,1) 9%, rgba(230,123,0,1) 50%, rgba(230,92,0,1) 100%)" : "radial-gradient(circle, rgba(76,129,144,1) 28%, rgba(40,24,52,0.9360119047619048) 100%)"
                                }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='bottom_Margin'>
                        <button className='buyNow-Button'>Buy now</button>
                    </div>
                    <div className='bottom_Margin product-Details-Div'>
                                <h4 style={{marginBottom:"10px"}}>Product details</h4>
                                <ul className='product-Details-list'>
                                    <li>Gender : {productData.globalProductInfo.gender}</li>
                                    {/* {
                                        <createDetails language={currentLanguage}></createDetails>
                                    } */}
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
                    {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
                </div>
            </div>
            }
        </div>
    )
}