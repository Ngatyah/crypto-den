import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "@firebase/auth";
import { CoinList } from '../configs/api';
import { auth } from '../firebase';


const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("rub");
    const [symbol, setSymbol] = useState('Ksh');
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        type: "success"
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null)
        })
    }, [])

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };


    useEffect(() => {
        if (currency === 'rub') setSymbol("ksh");
        else if (currency === 'usd') setSymbol("$")
    }, [currency]);
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, loading, coins, fetchCoins, openModal, setOpenModal, user, setUser, alert, setAlert }}>{children}</Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
