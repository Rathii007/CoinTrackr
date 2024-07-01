import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import Loader from "./Loader";
import "./Exchanges.css";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/exchanges`);
        console.log(response.data);
        setExchanges(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Axios Error:", error);
        setLoading(false);
      }
    };

    getExchangesData();
  }, []);

  const toggleView = () => {
    setIsGridView((prev) => !prev); // Toggle grid/list view state
  };

  return (
    <>
      <Header />
      <div className="exchanges-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="view-toggle">
              <button onClick={toggleView}>
                {isGridView ? "List View" : "Grid View"}
              </button>
            </div>
            <div
              className={
                isGridView
                  ? "ex-cards-container grid"
                  : "ex-cards-container list"
              }
            >
              {exchanges.map((item, i) => (
                <div key={i} className="ex-cards">
                  <div className="image">
                    <img height="70px" src={item.image} alt="img" />
                  </div>
                  <div className="details">
                    <div className="heading">Name:</div>
                    <div className="name">{item.name}</div>
                    <div className="heading">Trade Volume (BTC):</div>
                    <div className="price">
                      {item.trade_volume_24h_btc.toFixed(0)}
                    </div>
                    <div className="heading">Trust Score Rank:</div>
                    <div className="rank">{item.trust_score_rank}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Exchanges;
