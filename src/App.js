import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/navBar/Navbar';
import CoinPage from "./pages/CoinPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="h-screen text-white bg-[#14161A]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
