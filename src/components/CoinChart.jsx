import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./CoinChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const { id } = useParams();
  const [chartData, setchartData] = useState([]);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchCoinChartData = async () => {
      try {
        const { data } = await axios.get(
          `${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setchartData(data.prices);
        console.log(data.prices);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchCoinChartData();
  }, [currency, id, days]); // Include all dependencies that affect the effect

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} :${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency}`, // Changed `labels` to `label`
        data: chartData.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: 3, // Changed "3" to 3 (removed quotes)
      },
    ],
  };

  return (
    <>
      {chartData.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            style={{ marginTop: "5rem", width: "60rem" }}
          />
          <div className="btn" style={{ marginTop: "30px" }}>
            <button onClick={() => setDays(1)}>24 Hours</button>
            <button onClick={() => setDays(30)}>1 Month</button>
            <button onClick={() => setDays(365)}>1 Year</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinChart;
