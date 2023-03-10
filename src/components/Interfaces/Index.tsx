export interface ICrypto {
  exchangeId: string;
  exchangeUrl: string;
  name: string;
  percentTotalVolume: string;
  rank: string;
  socket: boolean;
  tradingPairs: string;
  updated: string;
  volumeUsd: string;
}

export interface IExRates {
  USD: number;
  EUR: number;
  BDT: number;
  ANG: number;
  CAD: number;
}

export interface IConverted {
  from: string;
  date: string;
  value: number;
  to: string;
}

export interface INasaData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
}

export interface ICryptoNews {
  date: string;
  description: string;
  title: string;
  url: string;
}
