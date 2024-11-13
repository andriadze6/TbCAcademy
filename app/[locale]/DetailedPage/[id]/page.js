
'use client'
import Image from "next/image";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../assets/css/DetailedPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductPage({ params }) {
    // const productData = await GetProduct(params.id)
    const [productData, setProductData] = useState(null);
    const { id } = params; // Access the dynamic parameter from the URL
    useEffect(()=>{
        (async function GetHomePageData() {
            const product = await fetch(`https://dummyjson.com/products/${id}`) 
            let produCtD = await product.json();
            setProductData(produCtD)
        })();
    },[id]);

    // Event Handlers
    const handleAddToCart = () => {
        console.log('Added to cart:', productData.title);
    };

    const handleAddToWishList = () => {
        console.log('Added to wishlist:', productData.title);
    };

    const handleCheckOut = () => {
        console.log('Proceeding to checkout for:', productData.title);
    };

    return (
        <>
            {productData &&
                <div className='ditealProduct-Conteiner'>
                    <div>
                        <Image layout="responsive" width={90} height={60} src={productData.images[0]} alt={productData.title} />
                    </div>
                    <div className='product-Info-Conteiner'>
                        <div className='prduct-Title'>
                            <h3>{productData.title}</h3>
                            <h3 className="price">{productData.price}<span id="currenst-Symbol">$</span></h3>
                        </div>
                        <div className="broder-left">
                            <div className="aboout-ProductDiv bottom-border">
                                <h5>About product:</h5>
                                <p>{productData.description}</p>
                            </div>
                            <div className='product-Details bottom-border'>
                                <h3>Product details:</h3>
                                <div>
                                    <div className='details-div'>
                                        <h4>Warranty Information</h4>
                                        <div className="spacer"></div>
                                        <p>{productData.warrantyInformation}</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Dimensions</h4>
                                        <div className="spacer"></div>
                                        <p>{productData.dimensions.width}/{productData.dimensions.height}/{productData.dimensions.depth}(w/h/d)</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Rating</h4>
                                        <div className="spacer"></div>
                                        <p>{productData.rating} / 5</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Stock</h4>
                                        <div className="spacer"></div>
                                        <p>{productData.stock}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='button-Div'>
                                <div className='amount-Div'>
                                    <span>Quantity:</span>
                                    <select id="Quantity">
                                        {Array.from({ length: productData.stock }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <button id="addTocard" type="submit">
                                        <FontAwesomeIcon icon={faShoppingBag} className="bag-icon" />
                                        <FontAwesomeIcon icon={faCircleNotch} spin className="spinner-icon" />                                        
                                        Add to cart
                                    </button>
                                </div>
                                <div class="">
                                    <button id="addWishList" type="submit" >
                                        <FontAwesomeIcon icon={faHeartOutline} className="heart-icon" />
                                        <FontAwesomeIcon icon={faCircleNotch} spin className="spinner-icon" />
                                        Add To Wish list
                                    </button>
                                    {/* <div class="addToCard-massageDiv">
                                        <div class="addToCard-massage">
                                            <img class="check-icon" src="/img/myicon/check-icon.png">
                                            <span>Added to Cart</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className='button-Div'>
                                <button id="toCheckout" class="button" type="submit">
                                    <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon" />
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
