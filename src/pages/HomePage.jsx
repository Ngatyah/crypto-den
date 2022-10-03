import React, { Fragment } from "react";
import CryptoTable from "../components/cryptoTable/CryptoTable";
import Hero from "../components/hero/Hero";

const HomePage = () => {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <Fragment>
      <Hero />
      <CryptoTable />
    </Fragment>
  );
};

export default HomePage;
