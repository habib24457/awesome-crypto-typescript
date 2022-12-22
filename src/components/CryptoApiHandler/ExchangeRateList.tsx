import React from "react";
import { IExRates } from "../Interfaces/Index";
import Flag from "react-flagkit";

type Props = {
  exchangeRates: IExRates;
};

const ExchangeRateList = ({ exchangeRates }: Props) => {
  console.log(exchangeRates);
  return (
    <div>
      <ol className="list-group list-group-numbered">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">USA</div>
            USD <Flag country="US" />
          </div>
          <span className="badge bg-primary rounded-pill">
            {exchangeRates.USD} $
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Germany</div>
            EUR <Flag country="DE" />
          </div>
          <span className="badge bg-success rounded-pill">
            {exchangeRates.EUR} €
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Canada</div>
            CAD <Flag country="CA" />
          </div>
          <span className="badge bg-success rounded-pill">
            {exchangeRates.CAD} $
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Bangladesh</div>
            BDT <Flag country="BD" />
          </div>
          <span className="badge bg-success rounded-pill">
            {exchangeRates.BDT} ৳
          </span>
        </li>
      </ol>
    </div>
  );
};

export default ExchangeRateList;
