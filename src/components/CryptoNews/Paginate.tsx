import React, { useState } from "react";
import { ICryptoNews } from "../Interfaces/Index";

type propsType = {
  news: ICryptoNews[];
  setTrimmedNews: React.Dispatch<React.SetStateAction<ICryptoNews[]>>;
};

const Paginate = ({ news, setTrimmedNews }: propsType) => {
  //console.log(news.slice(0, 2));
  const [pageNum, setPageNum] = useState(1);

  const handlePaginateClick = (pageNumber: number) => {
    if (pageNumber === 1) {
      setTrimmedNews(news.slice(0, 2));
      setPageNum(1);
    } else if (pageNumber === 2) {
      setTrimmedNews(news.slice(3, 5));
      setPageNum(2);
    } else if (pageNumber === 3) {
      setTrimmedNews(news.slice(6, 8));
      setPageNum(3);
    } else if (pageNumber === 4) {
      setTrimmedNews(news.slice(8, 10));
      setPageNum(4);
    } else {
      setTrimmedNews(news.slice(0, 2));
      setPageNum(1);
    }
    console.log(pageNumber);
  };

  return (
    <>
      <nav aria-label="..." style={{ cursor: "pointer" }}>
        <ul className="pagination pagination-lg">
          <li
            className={pageNum === 1 ? "page-item active" : "page-item"}
            aria-current="page"
          >
            <div className="page-link" onClick={() => handlePaginateClick(1)}>
              1
            </div>
          </li>

          <li className={pageNum === 2 ? "page-item active" : "page-item"}>
            <div className="page-link" onClick={() => handlePaginateClick(2)}>
              2
            </div>
          </li>

          <li className={pageNum === 3 ? "page-item active" : "page-item"}>
            <div className="page-link" onClick={() => handlePaginateClick(3)}>
              3
            </div>
          </li>

          <li className={pageNum === 4 ? "page-item active" : "page-item"}>
            <div className="page-link" onClick={() => handlePaginateClick(4)}>
              4
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Paginate;
