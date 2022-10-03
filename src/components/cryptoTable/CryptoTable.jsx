import React, { useEffect, useState } from "react";
import { CryptoState } from "../../store/CryptoContext";
import { numberWithCommas } from "../Carousel";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

const CryptoTable = () => {
  const { symbol, currency, loading, coins, fetchCoins } = CryptoState();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const len = handleSearch().length / 10;

  const clickHandler = (id) => {
    navigate(`/coins/${id}`);
  };

  return (
    <div className="mt-5 w-[90%] m-auto">
      <h1 className="text-3xl text-white text-center">
        Cryptocurrency Prices by Market Cap
      </h1>
      <div className="flex  ">
        <input
          className="bg-[#14161A] border-[1px] border-gray-100 w-[100%] mt-5 p-3 rounded text-white"
          type="text"
          placeholder="search for a crypto currency.."
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="">
        {loading ? (
          <ProgressBar
            height="80"
            width="290"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#DADADA"
            barColor="#EEBC1D"
          />
        ) : (
          <table className="table-auto w-[100%] mt-6 bg-[#14161A]">
            <thead className="text-black  bg-[#EEBC1D] h-20 w-[100%]">
              <tr className="">
                <th>coin</th>
                <th>price</th>
                <th>24h change</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <tr
                      onClick={() => clickHandler(row.id)}
                      className="h-[2px] hover:bg-slate-900 cursor-pointer  border-b-[1px] p-5 border-gray-100/50"
                      key={row.name}
                    >
                      <td className="m-5 flex gap-6  items-center">
                        <img
                          className="h-[60px]"
                          src={row.image}
                          alt={row.name}
                        />
                        <div className="flex flex-col">
                          <span>{row.symbol.toUpperCase()}</span>
                          <span>{row.name}</span>
                        </div>
                      </td>
                      <td className="ml-5">
                        {symbol}{" "}
                        {numberWithCommas(row?.current_price.toFixed(2))}
                      </td>
                      <td
                        className={profit ? "text-green-600" : "text-red-600"}
                      >
                        {profit && "+"}{" "}
                        {row?.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td>
                        {symbol}{" "}
                        {numberWithCommas(
                          (row?.market_cap / 100000).toFixed(2)
                        )}
                        M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <footer className="text-center h-[10%] m-4">
        <button
          onClick={() => setPage((n) => (n > 1 ? n - 1 : n))}
          className="bg-[#EEBC1D] mb-5 p-2 w-20 mr-4 rounded-lg"
        >
          Prev
        </button>
        {page}
        <button
          onClick={() => setPage((n) => (n < len ? n + 1 : n))}
          className="bg-[#EEBC1D] mb-5 p-2 w-20 ml-4 rounded-lg"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default CryptoTable;
