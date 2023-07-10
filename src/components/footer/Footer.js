import Logo from "../logo/Logo";

import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import LinkedIn from "../../assets/linkedin.svg";

import "./Footer.scss";

const Footer = () => {
  const scrollTo = (id) => {
    let element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="footerSection">
      <div className="footerContainer">
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
          <li className="footerItem">책 구매</li>
          <li className="footerItem">베스트셀러</li>
          <li className="footerItem">신상품</li>
          <li className="footerItem">인기도서</li>
        </ul>
      </div>
      <div className="buttom">
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
