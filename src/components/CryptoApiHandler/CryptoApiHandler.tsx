import React, { useState, useEffect } from "react";
import { ICrypto } from "../Interfaces/Index";
import axios from "axios";
import "./CryptoApiHandler.css";

const CryptoApiHandler = () => {
  const defaultCryptoData: ICrypto = {
    exchangeId: "",
    exchangeUrl: "",
    name: "",
    percentTotalVolume: "",
    rank: "",
    socket: true,
    tradingPairs: "",
    updated: "",
    volumeUsd: "",
  };
  const [cryptoData, setCryptoData] = useState<ICrypto[]>([defaultCryptoData]);
  const config = {
    method: "GET",
    url: "https://api.coincap.io/v2/exchanges",
    headers: {},
  };

  useEffect(() => {
    getCryptoData();
    // eslint-disable-next-line
  }, []);

  const getCryptoData = () => {
    axios(config)
      .then((response) => JSON.parse(JSON.stringify(response.data)))
      .then((result) => {
        const newCryptoArr: ICrypto[] = [];

        const resultData: ICrypto[] = result.data.slice(0, 10);

        resultData.map((singleCrypto: ICrypto) => {
          const newData: ICrypto = { ...defaultCryptoData };
          newData.name = singleCrypto.exchangeId;
          newData.updated = singleCrypto.updated;
          newData.volumeUsd = convertCurrency(singleCrypto.volumeUsd);
          newData.percentTotalVolume = convertPercentage(
            singleCrypto.percentTotalVolume
          );
          const date = new Date(singleCrypto.updated).toLocaleDateString();
          newData.updated = date;
          newData.exchangeUrl = singleCrypto.exchangeUrl;
          return newCryptoArr.push(newData);
        });

        console.log(newCryptoArr);

        setCryptoData(newCryptoArr);
        // const crypto: ICrypto[] = resultData.map((singleData: ICrypto) =>
        //   console.log(singleData)
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertPercentage = (percentValue: string) => {
    const num = parseFloat(percentValue).toFixed(2) + "%";
    return num.toString();
  };

  const convertCurrency = (labelValue: string) => {
    // Nine Zeroes for Billions
    return (Math.abs(Number(labelValue)) >= 1.0e9).toString()
      ? ((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B").toString()
      : // Six Zeroes for Millions
      (Math.abs(Number(labelValue)) >= 1.0e6).toString()
      ? ((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M").toString()
      : // Three Zeroes for Thousands
      (Math.abs(Number(labelValue)) >= 1.0e3).toString()
      ? ((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K").toString()
      : Math.abs(Number(labelValue)).toString();
  };

  // const getCurrencyExchange = () => {
  //   fetch(
  //     "https://api.currencybeacon.com/v1/latest?api_key=d43e33eb9710dc572c44c5e5c1dac285"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  //console.log(cryptoData);

  return (
    <div className="row">
      <div className="col-5 table-wrapper mt-2">
        <h5 className="text-design">
          Top 10 Crypto: (API:https://api.currencybeacon.com/ )
        </h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Crypto</th>
              <th scope="col">Rate ($)</th>
              <th scope="col">Volume (%)</th>
              <th scope="col">Updated</th>
              <th scope="col">Site</th>
            </tr>
          </thead>

          <tbody className="table-data">
            {cryptoData.map((singleCrypto: ICrypto) => (
              <tr className="table-row-design">
                <td>{singleCrypto.name}</td>
                <td>{singleCrypto.volumeUsd}</td>
                <td>{singleCrypto.percentTotalVolume}</td>
                <td>{singleCrypto.updated}</td>
                <td>
                  <a
                    href={singleCrypto.exchangeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="button-design">Visit</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-4"></div>
      <div className="col-2"></div>
    </div>
  );
};

export default CryptoApiHandler;
