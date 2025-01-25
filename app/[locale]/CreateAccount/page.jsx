"use client";
import './style.css'
import Link from 'next/link';
import { useState } from 'react';
import {useTranslations, useLocale } from 'next-intl';
export default function Login() {
    const t = useTranslations('LoginCreateAccount');
    const [checker, setChecker] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isRepeatPasswordValid: true,
        error: "",
    });
    const currentLanguage = useLocale(); // Get current language from next-intl
   async function CreateAccount(event){
        try{
            event.preventDefault();
            debugger
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const repeatPassword = document.getElementById("repeatPassword").value;
            const isEmailValid = ValidateEmail(email);
            const isPasswordValid = isPasswordStrong(password);
            const isRepeatPasswordValid = password === repeatPassword;
            if(!isEmailValid || !isPasswordValid || !isRepeatPasswordValid){
                setChecker({
                    isEmailValid: isEmailValid,
                    isPasswordValid: isPasswordValid,
                    isRepeatPasswordValid: isRepeatPasswordValid,
                    error: "Email is not valid"
                })
                return
            }
            else{
                let formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);
                const response = await fetch("/api/CreateUser", {
                  method: "POST",
                  body: formData, // FormData sets the correct Content-Type
                });
                const data = await response.json();
                if (response.ok) {
                    debugger
                }else{
                    debugger
                    if(data.error.includes("User already registered")){
                        setChecker({
                            ...checker,
                            isEmailValid: false,
                            error: data.error
                        })
                    }
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    function ValidateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isPasswordStrong(password) {
        if (password.length >= 8) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div style={{width:"30%", margin:"auto auto", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <form onSubmit={CreateAccount}>
                <div>
                    <h2 style={{marginBottom:"30px"}}>{t("Hello")}</h2>
                    <p style={{marginBottom:"30px"}}>{t("CreateAccountP")}
                    </p>
                </div>
                <div style={{marginBottom:"20px"}}>
                    <input
                    className='input'
                    type="mail"
                    placeholder={checker.isEmailValid ? "Email" : "Email is not valid"}
                    style={{borderColor: !checker.isEmailValid && "red"}}
                    name="" id="email" />
                    {
                        !checker.isEmailValid && (
                        <div style={{display:"flex", gap:"5px", marginTop:"10px",alignItems:"center"}}>
                            <svg style={{width:"20px", height:"20px", color:"red"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span style={{color:"red"}}>{checker.error}</span>
                        </div>
                        )
                    }
                </div>
                <div style={{marginBottom:"20px"}}>
                        <input
                        className='input'
                        type="password"
                        placeholder="Password"
                        name="" id="password"></input>
                        <div style={{display:"flex", gap:"5px", marginTop:"10px",alignItems:"center"}}>
                            <svg style={{width:"20px", height:"20px", color: checker.isPasswordValid ? "green" : "red" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span style={{color: checker.isPasswordValid ? "green" : "red"}}>Minimum 8 characters required</span>
                        </div>
                </div>
                <div style={{marginBottom:"20px"}}>
                    <input
                    className='input'
                    type="password"
                    placeholder="Repeat password"
                    name="" id="repeatPassword"></input>
                    <div style={{display:"flex", gap:"5px", marginTop:"10px",alignItems:"center"}}>
                        <svg style={{width:"20px", height:"20px", color: checker.isPasswordValid ? "green" : "red" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span style={{color: checker.isPasswordValid ? "green" : "red"}}>Password must match</span>
                    </div>
                </div>
                <Link href={`/${currentLanguage}/Login`} style={{marginBottom:"30px", textDecoration:"underline"}}>Already have an account Login</Link>
                <button style={{marginTop:"10px"}} className='SignInButton'>Create an account</button>
            </form>
        </div>
    )
}