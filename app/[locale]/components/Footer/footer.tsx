import "./footerStyle.css";
import Image from "next/image";
import instagramIcon from '../../assets/img/InstagramIcon.png'
import facebookIcon from '../../assets/img/facebookIcon.png';
import twitterIcon from '../../assets/img/twitterIcon.png';

const Footer = () => {
  return (
    <footer style={{maxHeight:"100hv"}} className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social">
            <Image src={facebookIcon} alt="" />
            <Image src={instagramIcon} alt=''/>
            <Image src={twitterIcon} alt=''/>
          </div>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2025 Your Company. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
