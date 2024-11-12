'use client'
import '../assets/css/shopLayout.css'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { memo } from 'react';
import { useLocale } from "next-intl";


function Card (params){
    var element = params.Product
    const locale = useLocale();
    return(
    <>
        <Link href={`${locale}/DetailedPage/${element.id}`} className='card'>
            <div className='cardImg'>
                <Image alt='' src={element.images[0]} width={268} height={400}/>
            </div>
            <div className='product_content-header'>
                <h4>{element.title}</h4>
                <FontAwesomeIcon icon={faHeartOutline} className="heart-icon" />
            </div>
            <div className='product_price_rating'>
                <h4><span>$</span>{element.price}</h4>
                <div className='product_rating'>
                    <ul>
                        <li><FontAwesomeIcon icon={faStar} className="star-icon" /></li>
                        <li><FontAwesomeIcon icon={faStar} className="star-icon" /></li>
                        <li><FontAwesomeIcon icon={faStar} className="star-icon" /></li>
                        <li><FontAwesomeIcon icon={faStar} className="star-icon" /></li>
                        <li><FontAwesomeIcon icon={faStar} className="star-icon" /></li>
                    </ul>
                </div>
            </div>
        </Link>
    </>)
}
export default memo(Card);