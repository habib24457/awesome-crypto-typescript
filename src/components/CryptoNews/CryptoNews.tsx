import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICryptoNews } from "../Interfaces/Index";
import Skeleton from "react-loading-skeleton";
import Paginate from "./Paginate";

const CryptoNews = () => {
  const [news, setNews] = useState<ICryptoNews[]>([
    {
      date: "",
      description: "",
      title: "",
      url: "",
    },
  ]);
  const [iseLoaded, setIsLoaded] = useState(false);
  const [trimmedNews, setTrimmedNews] = useState<ICryptoNews[]>([
    {
      date: "",
      description: "",
      title: "",
      url: "",
    },
  ]);
  const key = process.env.REACT_APP_RAPID_API_KEY;

  console.log(key);

  const options = {
    method: "GET",
    url: "https://crypto-news16.p.rapidapi.com/news/top/10",
    headers: {
      "X-RapidAPI-Key": "184e7793fbmshd0ba8d5fa6bbd5cp19e81cjsn950c9059f25c",
      "X-RapidAPI-Host": "crypto-news16.p.rapidapi.com",
    },
  };

  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, []);

  const getNews = () => {
    axios
      .request(options)
      .then(function (response) {
        setNews(response.data);
        setTrimmedNews(response.data.slice(0, 2));
        setIsLoaded(true);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        setIsLoaded(false);
      });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-2"></div>

      {iseLoaded ? (
        <div className="col-md-8" style={{ height: "80vh" }}>
          <div className="row">
            {trimmedNews.map((singleNews: ICryptoNews) => (
              <div className="col-md-6" key={singleNews.title}>
                <div
                  className="card border-info mb-3"
                  style={{
                    maxWidth: "25rem",
                    height: "auto",
                    overflow: "scroll",
                  }}
                >
                  <div className="card-header">
                    <h5>{singleNews.title}</h5>
                  </div>
                  <div className="card-body">
                    <p>Published On: {singleNews.date}</p>
                    <h6 className="card-text">{singleNews.description}</h6>
                    <a href={singleNews.url} target="_blank" rel="noreferrer">
                      <button className="btn btn-secondary">Visit</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-md-4"></div>
            <div className="col-md-4 mt-5 mb-5">
              <Paginate news={news} setTrimmedNews={setTrimmedNews} />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      ) : (
        <div className="col-md-8">
          <Skeleton count={5} />
        </div>
      )}

      <div className="col-md-2"></div>
    </div>
  );
};

export default CryptoNews;
