import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Audio, ProgressBar } from "react-loader-spinner";
import { HistoricalChart } from "../configs/api";
import { CryptoState } from "../store/CryptoContext";
import { chartDays } from "../configs/data";

const CoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    console.log("called");
    fetchHistoricalData();
  }, [coin, currency, days]);
  console.log("Data Here", historicalData && historicalData[0]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {!historicalData ? (
        <Audio
          height="100"
          width="100"
          color="#EEBC1D"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      ) : (
        <Fragment>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `price(past ${days} days) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div>
            {chartDays.map((day) => {
              return (
                <button
                  onClick={() => setDays(day.value)}
                  className={
                    day.value === days
                      ? " bg-[#EEBC1D] p-3 px-16 m-1 border-2 border-[#EEBC1D] rounded"
                      : "p-3 px-16 m-1 border-2 border-[#EEBC1D] rounded"
                  }
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CoinChart;
