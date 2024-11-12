'use client'
import Card from './Card';
import '../assets/css/shopLayout.css';
import { useEffect, useState } from "react";
import FilterProduct from '../../Functions/GetSortProducts';

function ShopLayout({Result}){
    const [productList, SetProductList] = useState(Result.Product);
    const [colomuns, setColomuns] = useState("4");
    function selectOnChange(value){
        let category = Result.Category;
        let nestedCategory = Result.NestedCategory;
        let searchParams = Result.SearchParams;
        let FilterData = FilterProduct(value, category, nestedCategory, searchParams);
    }
    function changeColumns(col){
        if (colomuns != col) {
            setColomuns(Number(col));
        }
    }
    return(
        <div className='shopLayout'>
            <div className="shop_toolbar_wrapper">
                <div className="shop_toolbar_btn">
                    <button type="button" onClick={()=>changeColumns("3")} className="btn-grid-3" title="3"></button>
                    <button type="button" onClick={()=>changeColumns("4")} className="active btn-grid-4" title="4"></button>
                    <button type="button" className="btn-list" title="4"></button>
                </div>
                <div className='SortProductDiv'>
                    <p>Sort by</p>
                    <select onChange={(e)=>{selectOnChange(e.target.value)}}>
                        <option>Default</option>
                        <option value="1">Lowest price</option>
                        <option value="2">Highest price</option>
                    </select>
                </div>
                <div className="page_amount">
                    <p>Showing 1–9 of 21 results</p>
                </div>
            </div>
            <div className='cardList' style={{gridTemplateColumns: `repeat(${colomuns}, 1fr`}}>
                {
                    productList.length > 0 &&(
                        productList.map((element)=>{
                            return(
                                <Card key={element.id} Product={element}></Card>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}
export default ShopLayout;