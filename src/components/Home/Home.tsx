import React, { useState } from "react";
import "./Home.css";
import CryptoApiHandler from "../CryptoApiHandler/CryptoApiHandler";
import NasaAPI from "../NasaAPI/NasaAPI";
import Footer from "../Footer/Footer";

const Home = () => {
  const [navIndex, setNavIndex] = useState<Number>(1);
  return (
    <div className="home">
      <div className="nav-bar">
        <div className="row">
          <div className="col-md-12">
            <div className="bloc-tabs">
              <button
                className={navIndex === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => setNavIndex(1)}
              >
                Check Crypto Currency
              </button>

              <button
                className={navIndex === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => setNavIndex(2)}
              >
                Check Daily photo from NASA
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="component-stage">
        {navIndex === 1 && <CryptoApiHandler />}
        {navIndex === 2 && <NasaAPI />}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
