import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../configs/api";
import { CryptoState } from "../store/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const fetchTrendingCrypto = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCrypto();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    // console.log(coin?.current_price.toFixed(2));
    return (
      <Link
        to={`/coins/${coin.id}`}
        className="flex flex-col cursor-pointer justify-center items-center"
      >
        <img
          className="md:h-[50px] h-[30px]"
          src={coin?.image}
          alt={coin.name}
        />
        <div className="mt-1 ">
          <span>{coin?.symbol.toUpperCase} </span>
          <span className={profit ? "text-green-600" : "text-red-600"}>
            {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div className="mt-1">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
    />
  );
};

export default Carousel;
