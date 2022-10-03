import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { CryptoState } from "../../store/CryptoContext";

const Navbar = () => {
  const { currency, setCurrency, setOpenModal, user } = CryptoState();
  const navigate = useNavigate();

  return (
    <div className="h-[10%] px-10 flex border-b-2 border-[#0a0a0a] drop-shadow shadow-black items-center justify-between text-[#EEBC1D]">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Crypto DEN
      </h1>
      <div className="px-3">
        <select
          className="bg-[#14161A] py-2 rounded text-white px-3 border-2 border-gray-200"
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="rub">Ksh</option>
          <option value="usd">USD</option>
        </select>
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="pl-4 bg-[#EEBC1D] ml-2 py-2 px-3 text-black rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setOpenModal(true)}
            className="pl-4 bg-[#EEBC1D] ml-2 py-2 px-3 text-black rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
