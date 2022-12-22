import React, { useState, useEffect } from "react";
import { ICrypto, IExRates } from "../Interfaces/Index";
import axios from "axios";
import "./CryptoApiHandler.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ExchangeRateList from "./ExchangeRateList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CryptoStatistics from "../CryptoConverter/CryptoConverter";

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
  const [exchangeRates, setExchangeRates] = useState<IExRates>({
    USD: 0,
    EUR: 0,
    BDT: 0,
    ANG: 0,
    CAD: 0,
  });
  const [value, onChange] = useState(new Date());
  const key = process.env.REACT_APP_COIN_API_KEY;
  const config = {
    method: "GET",
    url: "https://api.coincap.io/v2/exchanges",
    headers: {},
  };
  const [isExRatesLoaded, setIsExRatesLoaded] = useState(false);
  const [isCryptoLoaded, setIsCryptoLoaded] = useState(false);

  useEffect(() => {
    getCryptoData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getExchangeRateByDate();
    // eslint-disable-next-line
  }, [value]);

  const getCryptoData = async () => {
    await axios(config)
      .then((response) => JSON.parse(JSON.stringify(response.data)))
      .then((result) => {
        const newCryptoArr: ICrypto[] = [];
        const resultData: ICrypto[] = result.data.slice(0, 10);

        resultData.map((singleCrypto: ICrypto) => {
          const newData: ICrypto = { ...defaultCryptoData };
          //newData.exchangeId = singleCrypto.exchangeId;
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
        setCryptoData(newCryptoArr);
        setIsCryptoLoaded(true);
      })
      .catch((error) => {
        setIsCryptoLoaded(false);
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

  const getExchangeRateByDate = async () => {
    const selectedDate = value.toLocaleDateString("en-CA");
    const exchangeRateConfig = {
      method: "GET",
      url: `https://api.currencybeacon.com/v1/historical?api_key=${key}=USD&date=${selectedDate}`,
    };

    await axios(exchangeRateConfig)
      .then((response) => JSON.parse(JSON.stringify(response.data)))
      .then((data) => {
        const newRates = { ...exchangeRates };
        newRates.USD = data.response.rates.USD;
        newRates.ANG = data.response.rates.ANG;
        newRates.EUR = data.response.rates.EUR;
        newRates.CAD = data.response.rates.CAD;
        newRates.BDT = data.response.rates.BDT;
        setExchangeRates(newRates);
        setIsExRatesLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  console.log(exchangeRates);

  return (
    <div className="row mt-5">
      <div className="col-1"></div>

      <div className="col-5 table-wrapper mt-2">
        <h6 className="text-design">Top 10 Crypto</h6>
        <hr />
        {isCryptoLoaded ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Crypto</th>
                <th scope="col">Rate ($)</th>
                <th scope="col">Volume (%)</th>
                <th scope="col">Statistics</th>
                <th scope="col">Site</th>
              </tr>
            </thead>

            <tbody className="table-data">
              {cryptoData.map((singleCrypto: ICrypto) => (
                <tr key={singleCrypto.name} className="table-row-design">
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
        ) : (
          <Skeleton count={10} />
        )}
      </div>

      <div className="col-5">
        <div className="row">
          <div className="col-6 calender-col">
            <h6>Select a date to see the exchange rates</h6>
            <Calendar onChange={onChange} value={value} maxDate={new Date()} />
          </div>

          <div className="col-6 mt-4 calender-col">
            {isExRatesLoaded ? (
              <ExchangeRateList exchangeRates={exchangeRates} />
            ) : (
              <Skeleton count={5} />
            )}
          </div>
        </div>{" "}
        {/**end ot sub row-1 */}
        <div className="row mt-4 stat-row">
          <CryptoStatistics />
        </div>
        {/**End of sub row-2*/}
        <div className="row mt-5">
          <div className="col-12">API Source:https://currencybeacon.com</div>
        </div>
      </div>
      {/**End of column*/}
      <div className="col-1"></div>
    </div>
  );
};

export default CryptoApiHandler;
