import '../assets/css/myAccount.css';
import Link from 'next/link';
function MyAccountManue(){
    return(                
    <div className="myAccountManue-Div">
        <ul className='myAccountManue'>
            <Link href='/MyAccount' className='navName'><li>My Acount</li></Link>
            <Link href='' className='navName'><li>Check out</li></Link>
            <Link href='' className='navName'><li>Shoping cart</li></Link>
            <Link href='' className='navName'><li>Wish list</li></Link>
            <Link href='' className='navName'><li>log out</li></Link>           
        </ul>
    </div>)
}
export default MyAccountManue;