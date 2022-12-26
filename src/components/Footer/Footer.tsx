import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="row footer-design">
      <div className="col-md-1"></div>
      <div className="col-md-4">
        <p> Devloper: Habibur Rahman</p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} className="fa-des" />
          E-mail: habiburehman390@gmail.com
        </p>
        <p> 2022 All rights reserved</p>
      </div>
      <div className="col-md-3">
        <p> Technologies used:</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className="fa-des" />
            React JS
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className="fa-des" />
            Typescript
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className="fa-des" />
            Asynchronous JS
          </li>
        </ul>
      </div>
      <div className="col-md-3">
        <p> APIs:</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className="fa-des" />
            For Crypto Currency and convert Currency: https://currencybeacon.com
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className="fa-des" />
            For Daily Crypto News: Rapid API: crypto-news-16
          </li>
        </ul>
      </div>
      <div className="col-md-1"></div>
    </div>
  );
};

export default Footer;
