import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_1">
          <h3>Support</h3>
          <p>Help Center</p>
          <p>Our COVID-19 Response</p>
          <p>Cancellation options</p>
          <p>Safety information</p>
        </div>
        <div className="footer_2">
          <h3>Company</h3>
          <p>About us</p>
          <p>Community Blog</p>
          <p>Careers</p>
          <p>Privacy policy</p>
          <p>Terms of service</p>
        </div>
        <div className="footer_3">
          <h3>Contact</h3>
          <p>Partnerships</p>
          <p>FAQ</p>
          <p>Get in touch</p>
        </div>
        <div className="footer_4">
          <h3>Social</h3>
          <div className="social"></div>
        </div>
      </div>
      <div className="footer_cpr">
        <p>© Copyright Traveler 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
