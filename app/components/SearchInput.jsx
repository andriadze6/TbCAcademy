'use client'
import Image from "next/image";
import '../assets/css/Header.css'
import searchIcon from '../assets/img/icon-search.png';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from "react";

function Search(){
    const newPathname = '/ShopLayout';
    const [text, setText] = useState('');
    const [debouncedText] = useDebounce(text, 1000);
    const searchParamsGlobal = useSearchParams();
    const router = useRouter();
    useEffect(()=>{
        function handleSearch() {
            const searchParams =searchParamsGlobal
            const params = new URLSearchParams(searchParams);
            console.log(debouncedText);
            if (debouncedText) {
                params.set('query', debouncedText);
              } else {
                params.delete('query');
              }
              router.push(`${newPathname}/search?${params.toString()}`);
            //   replace(`${newPathname}?${params.toString()}`);
        };
        if(debouncedText.length>0){
            handleSearch();
        }
    },[debouncedText])
    return(
        <div className='search-Div'>
            <input
            onChange={(e) => {
            setText(e.target.value);
        }}
        placeholder='Search...' className='search-input'
        defaultValue={searchParamsGlobal.get('query')?.toString()}/>
            <button id='search-button'><Image src={searchIcon} alt="" /></button>
    </div>
    )
}
export default Search