import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Coins.css";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [search, setSearch] = useState("");
  const [viewType, setViewType] = useState("grid");
  const currencySymbol = currency === "inr" ? "₹" : "$";

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/coins/markets`, {
          params: {
            vs_currency: currency,
          },
        });

        console.log(response.data);
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Axios Error:", error);
        setLoading(false);
      }
    };

    getCoinsData();
  }, [currency]);

  const toggleView = () => {
    setViewType(viewType === "grid" ? "list" : "grid");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Coins"
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="btns">
              <button onClick={() => setCurrency("inr")}>INR</button>
              <button onClick={() => setCurrency("usd")}>USD</button>
            </div>
            <div className="toggle-view">
              <button onClick={toggleView}>
                {viewType === "grid" ? "List View" : "Grid View"}
              </button>
            </div>
          </div>
          <div className={`coin-cards-container ${viewType}`}>
            {coins
              .filter((data) => {
                if (search === "") {
                  return true;
                } else {
                  return data.name.toLowerCase().includes(search.toLowerCase());
                }
              })
              .map((coindata, i) => (
                <CoinCard
                  key={i}
                  coindata={coindata}
                  id={coindata.id}
                  currencySymbol={currencySymbol}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} className="coin-link">
      <div className="coin-card">
        <div className="image">
          <img src={coindata.image} alt="" />
        </div>
        <div className="details">
          <div className="name">{coindata.name}</div>
          <div className="price">
            {currencySymbol}
            {coindata.current_price.toFixed(0)}
          </div>
          <div className={`change ${profit ? "positive" : "negative"}`}>
            {profit
              ? `+${coindata.price_change_percentage_24h.toFixed(2)}`
              : coindata.price_change_percentage_24h.toFixed(2)}
            %
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Coins;
