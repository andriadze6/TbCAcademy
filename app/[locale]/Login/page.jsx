"use client";
import './style.css'
import Link from 'next/link';

export default function Login() {
    const currentLanguage = useLocale(); // Get current language from next-intl

    function validateEmail(email) {
        // Define a regex for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the input against the regex
        return emailRegex.test(email);
      }
    return (
        <div style={{height:"500px", width:"30%", margin:"auto auto", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <form onSubmit={LoginTo}>
                <div>
                    <h2 style={{marginBottom:"30px"}}>Nice to see you again</h2>
                    <p style={{marginBottom:"30px"}}>By signing you will be able to know the status
                        of your orders, the products saved in your Wishlist and your
                        Jackie Club Points available to redeem them for discounts
                    </p>
                </div>
                <div>
                    <input onChange={(e) => {
                        validateEmail(e.target.value);
                    }} className='input' required type="mail" placeholder="Email" name="" id="" />
                </div>
                <div>
                    <input className='input' required type="password" placeholder="Password" name="" id=""></input>
                </div>
                <Link href={`/${currentLanguage}/ForgetPassword`} style={{marginBottom:"30px", textDecoration:"underline"}}>Forget password?</Link>
                <div style={{margin:"30px"}}>
                    <button type='submit' className='SignInButton'>Login in</button>
                </div>
                <Link href={`/${currentLanguage}/CreateAccount`}>
                    <button className='SignInButton'>Create an account</button>
                </Link>
            </form>

        </div>
    )
}