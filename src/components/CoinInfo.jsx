import React from "react";
import ReactHtmlParser from "react-html-parser";
import { CryptoState } from "../store/CryptoContext";
import { numberWithCommas } from "./Carousel";

const CoinInfo = ({ coin }) => {
  const { currency, symbol } = CryptoState();

  let marketCap =
    coin?.market_data.market_cap &&
    numberWithCommas(
      (coin?.market_data.market_cap[currency.toLowerCase()] / 1000000).toFixed(
        2
      )
    );
  let marketPrice =
    coin?.market_data.current_price &&
    numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]);
  return (
    <div className="flex flex-col pr-6 lg:border-r-2 border-gray-500 justify-center items-center lg:col-span-1">
      <img src={coin?.image.large} alt={coin?.id} />
      <h1 className="my-5 text-xl">{coin?.name}</h1>
      <div className="self-start justify-self-start">
        <p className="text-justify">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </p>
        <div className="text-2xl space-y-2.5 text-center">
          <h1 className="self-center mt-4 ">
            Rank:{" "}
            <span className="text-lg self-center">{coin?.coingecko_rank}</span>
          </h1>
          <h1>
            Market Cap:{" "}
            <span className="text-lg">
              {" "}
              {symbol} {marketCap} M
            </span>
          </h1>
          <h1>
            market Price:{" "}
            <span className="text-lg">
              {" "}
              {symbol} {marketPrice}{" "}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
