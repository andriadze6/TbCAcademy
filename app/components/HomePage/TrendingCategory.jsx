'use client'
import Slider from '../SlidesPerView';
import '../../assets/css/trending.css';
import { useEffect,useState } from 'react';
export default function TrendingCategory({props}){
    const [manTrending, womanTrending] = props
    const [trending, setTrendingData] = useState({
        data:womanTrending,
        gender:"woman"
    });
    return(
        <>
            <div className="trending-Slider-Header">
                <div>
                    <h2>trending items</h2>
                    <p className="capitalize">Browse the collection of our best selling and trending products</p>
                </div>
                <ul className="trending-Ul">
                    <li 
                        onClick={() => setTrendingData({data:womanTrending, gender:"woman"})} 
                        className={`treding-gender ${trending.gender === "woman" ? "trandingActive" : ""}`}
                    >
                        Woman
                    </li>
                    <li 
                        onClick={() => setTrendingData({data:manTrending, gender:"man"})} 
                        className={`treding-gender ${trending.gender === "man" ? "trandingActive" : ""}`}
                    >
                        Man
                    </li>
                    <li className="treding-gender">Kid</li>
                </ul>
            </div>
            <Slider obj={trending.data} />
        </>

    )
}