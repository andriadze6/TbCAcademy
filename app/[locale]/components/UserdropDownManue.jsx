'use client'
import React from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Image from "next/image";


export default function DropDownList(){
    const { user, error, isLoading } = useUser();
    return(
        <div style={{display:'flex', justifyContent:"end"}}>
            {
                user ?
                (
                <div className='user'>
                    <div className='userImg-div'>
                        <img className='userImg' width={100} height={100} src={user.picture} alt="" />
                    </div>
                    <ul className='userProfile'>
                        <Link href='/MyAccount' className='navName'><li>My Account &#129171;</li></Link>
                        <Link href='' className='navName'><li>Check out &#129171;</li></Link>
                        <Link href='' className='navName'><li>Shopping cart &#129171;</li></Link>
                        <Link href='' className='navName'><li>Wish list &#129171;</li></Link>
                        <li><a href="/api/auth/logout">Logout</a></li>
                    </ul>
                </div>
                ) :
                (
                    <div className='login-Account'>
                    <a className='sign-button' href="/api/auth/login">Login</a>
                </div>)
            }


    </div>

    )
}