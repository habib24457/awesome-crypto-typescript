import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CryptoConverter.css";
import "bootstrap";
import { IConverted } from "../Interfaces/Index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CryptoConverter = () => {
  const key: string = "d43e33eb9710dc572c44c5e5c1dac285&base";
  const [fromVal, setFromVal] = useState("USD");
  const [toVal, setToVal] = useState("USD");
  const [amountVal, setAmountVal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [convertedData, setConvertedData] = useState<IConverted>({
    from: "",
    date: "",
    value: 0,
    to: "",
  });
  // eslint-disable-next-line
  const [errorMsg, setErrMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line
  }, [fromVal, toVal, amountVal]);

  const validateForm = () => {
    if (
      fromVal.length === 0 ||
      toVal.length === 0 ||
      isNaN(amountVal) ||
      !amountVal
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const converter = async () => {
    const config = {
      method: "GET",
      url: `https://api.currencybeacon.com/v1/convert?api_key=${key}&from=${fromVal}&to=${toVal}&amount=${amountVal}`,
      headers: {},
    };

    await axios(config)
      .then((response) => JSON.parse(JSON.stringify(response.data)))
      .then((data) => {
        setConvertedData(data.response);
        setIsLoaded(true);
      })
      .catch((error) => {
        setErrMsg(
          "Something Went Wrong. Please check your inputs and try again."
        );
        console.log(error);
      });
  };

  //console.log("Drop", fromVal);

  return (
    <div className="row">
      <div className="col-3">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {fromVal}
          </button>
          <ul className="dropdown-menu">
            <li
              onClick={(e: any) => setFromVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              USD
            </li>
            <li
              onClick={(e: any) => setFromVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              CAD
            </li>
            <li
              onClick={(e: any) => setFromVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              EUR
            </li>
            <li
              onClick={(e: any) => setFromVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              BDT
            </li>
            <li
              onClick={(e: any) => setFromVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              ANG
            </li>
          </ul>
        </div>
      </div>
      <div className="col-3">
        <input
          id="amount-input"
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e: any) => setAmountVal(e.target.value)}
          value={amountVal}
        />
      </div>
      <div className="col-3">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {toVal}
          </button>
          <ul className="dropdown-menu">
            <li
              onClick={(e: any) => setToVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              USD
            </li>
            <li
              onClick={(e: any) => setToVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              CAD
            </li>
            <li
              onClick={(e: any) => setToVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              EUR
            </li>
            <li
              onClick={(e: any) => setToVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              BDT
            </li>
            <li
              onClick={(e: any) => setToVal(e.target.innerHTML)}
              className="dropdown-item"
            >
              ANG
            </li>
          </ul>
        </div>
      </div>

      <div className="col-3">
        {isValid ? (
          <button onClick={() => converter()} className="btn btn-outline-dark">
            Convert
          </button>
        ) : (
          <div>
            <p>Input has to be a number and you must select the Currencies.</p>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4 converted-res">
          {isLoaded ? (
            <>
              <h5>
                Converted to:{" "}
                <span className="text-success">{convertedData.to}</span>
              </h5>
              <h6>Amount: {convertedData.value}</h6>
              <h6>Date: {convertedData.date}</h6>
            </>
          ) : (
            <Skeleton count={4} />
          )}
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default CryptoConverter;
