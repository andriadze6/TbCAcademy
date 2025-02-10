"use client";
import './style.css'
import Link from 'next/link';
import {useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/UserSessionProvider';
import { login, signup } from './actions'


export default function LoginPage() {
    const currentLanguage = useLocale(); // Get current language from next-intl
    const t = useTranslations('LoginCreateAccount');
    const router = useRouter();
    const { user, loading, setUser } = useAuth();
    function validateEmail(email) {
        // Define a regex for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the input against the regex
        return emailRegex.test(email);
    }

    async function LoginTo(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("/api/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure content type is JSON
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if(response.ok){
            const data = await response.json();
            if (data.error) {
                console.error("Login Error:", data.error);
                return;
            }
            setUser(data);
            router.replace(`/${currentLanguage}`);
        }

    }

    return (
        <div style={{ width:"30%", margin:"auto auto", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <form onSubmit={LoginTo}>
                <div>
                    <h2 style={{marginBottom:"30px"}}>{t("LoginHeader")}</h2>
                    <p style={{marginBottom:"30px"}}>{t("LoginPText")}
                    </p>
                </div>
                <div>
                    <input onChange={(e) => {
                        validateEmail(e.target.value);
                    }} className='input' required type="mail" placeholder="Email" name="" id="email" />
                </div>
                <div>
                    <input className='input' required type="password" placeholder="Password" name="" id="password"></input>
                </div>
                <Link href={`/${currentLanguage}/ForgetPassword`} style={{marginBottom:"30px", textDecoration:"underline"}}>{t("ForGetPassword")}</Link>
                <div style={{margin:"30px"}}>
                    <button type='submit' className='SignInButton'>{t("Login")}</button>
                </div>
                <Link href={`/${currentLanguage}/CreateAccount`}>
                    <button className='SignInButton'>{t("CreateAnAccount")}</button>
                </Link>
            </form>
        </div>
    )
}