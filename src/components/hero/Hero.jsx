import React, { useState } from "react";
import Carousel from "../Carousel";
import Modal from "react-modal";
import { CryptoState } from "../../store/CryptoContext";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";

Modal.setAppElement("#root");
const Hero = () => {
  const { openModal, setOpenModal } = CryptoState();
  const [tab, setTab] = useState(1);

  return (
    <div className=" flex flex-col items-center justify-center bg-[url('https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg')] h-[65%]">
      <Modal
        style={{
          overlay: {
            background: "none",
          },
        }}
        className="flex lg:w-[30%] lg:h-[50%] my-[30vh] lg:mx-[30vw] sm:w-[70%] sm:mx-[10vw] sm:h-[50%] flex-col bg-[#424242] text-white rounded-lg"
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <div className="grid grid-cols-2  my-2">
          <button
            className={tab === 1 && "border-b-4 border-[#8E193C]"}
            onClick={() => setTab(1)}
          >
            Login
          </button>
          <button
            className={tab === 2 && "border-b-4 border-[#8E193C]"}
            onClick={() => setTab(2)}
          >
            SignUp
          </button>
        </div>
        {tab === 1 ? <Login /> : <SignUp />}
      </Modal>
      <h1 className="text-white text-center text-6xl font-bold mt-20">
        Crypto Hunters
      </h1>
      <p className="text-white mt-4">
        Get all the latest info regarding your Favorite Crypto.
      </p>
      <Carousel />
    </div>
  );
};

export default Hero;
