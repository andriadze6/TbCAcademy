'use client'
import {useTranslations} from 'next-intl';
import Slider from '../SlidesPerView';
import '../../assets/css/trending.css';
import { useEffect,useState } from 'react';
export default function TrendingCategory({props}){
    const [manTrending, womanTrending] = props
    const [trending, setTrendingData] = useState({
        data:womanTrending,
        gender:"woman"
    });
    const t = useTranslations('HomePage');
    return(
        <>
            <div className="trending-Slider-Header">
                <div>
                    <h2>{t('TrendingItems')}</h2>
                    <p className="capitalize">{t('TrendingTitle')}</p>
                </div>
                <ul className="trending-Ul">
                    <li 
                        onClick={() => setTrendingData({data:womanTrending, gender:"woman"})} 
                        className={`treding-gender ${trending.gender === "woman" ? "trandingActive" : ""}`}>
                        {t('Woman')}
                    </li>
                    <li
                        onClick={() => setTrendingData({data:manTrending, gender:"man"})} 
                        className={`treding-gender ${trending.gender === "man" ? "trandingActive" : ""}`}>
                        {t('Man')}
                    </li>
                    <li className="treding-gender">{t('Kids')}</li>
                </ul>
            </div>
            <Slider obj={trending.data} />
        </>

    )
}