import React, { useState, useEffect } from "react";
import axios from "axios";
import { INasaData } from "../Interfaces/Index";
import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

const NasaAPI = () => {
  const key = process.env.REACT_APP_NASA_API_KEY;
  const [nasaData, setNasaData] = useState<INasaData>({
    copyright: "",
    date: "",
    explanation: "",
    hdurl: "",
    title: "",
    url: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(key);

  const config = {
    method: "GET",
    url: "https://api.nasa.gov/planetary/apod?api_key=4sSF7cE5UL6lTJ4AnDvHVGPxkdhu0c2QppVtC1ZM",
    headers: {},
  };

  useEffect(() => {
    axios(config)
      .then((res) => JSON.parse(JSON.stringify(res.data)))
      .then((data) => {
        setNasaData(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row mt-5">
      {isLoaded ? (
        <>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <img
                src={nasaData.hdurl}
                alt="astro_photo"
                style={{ height: "50vh", width: "50vw" }}
              />
              <p>
                @Copyright: {nasaData.copyright} | Date: {nasaData.date}
              </p>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h4>About this photo : {nasaData.title}</h4>
              <p>{nasaData.explanation}</p>
              <p>API source: {nasaData.url}</p>
            </div>
            <div className="col-2"></div>
          </div>
        </>
      ) : (
        <Skeleton count={5} />
      )}
    </div>
  );
};

export default NasaAPI;
