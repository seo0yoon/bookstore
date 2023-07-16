import Logo from "../logo/Logo";

import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import LinkedIn from "../../assets/linkedin.svg";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footerContainer">
        <div className="left">
          <Logo />
          <div className="iconList">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="facebook"
            >
              <img src={Facebook} alt="facebook" />
            </a>
            <a
              href="https://www.instagram.com/code.bucks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="instagram"
            >
              <img src={Instagram} alt="instagram" />
            </a>
            <a
              href="https://twitter.com/code_bucks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="twitter"
            >
              <img src={Twitter} alt="twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/codebucks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
            >
              <img src={LinkedIn} alt="linkedin" />
            </a>
          </div>
        </div>
        <ul className="footerMenuItems">
          <li className="footerItem">회사소개</li>
          <li className="footerItem">이용약관</li>
          <li className="footerItem">개인정보처리방침</li>
          <li className="footerItem">청소년보호정책</li>
          <li className="footerItem">대량주문안내</li>
          <li className="footerItem">광고소개</li>
        </ul>
      </section>
      <div className="buttom">
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
