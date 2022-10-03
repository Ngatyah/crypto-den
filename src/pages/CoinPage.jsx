import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../configs/api";
import CoinInfo from "../components/CoinInfo";
import CoinChart from "../components/CoinChart";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchSingleCoin();
  }, [id]);

  return (
    <div className="grid mt-5 lg:grid-cols-4 sm:grid-cols-1  gap-3 h-screen w-[100vw] justify-between px-5">
      <CoinInfo coin={coin} />

      <div className="lg:col-span-3 lg:pl-8">
        <CoinChart coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
