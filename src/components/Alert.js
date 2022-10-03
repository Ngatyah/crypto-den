import React from 'react'
import { CryptoState } from '../store/CryptoContext';


const Alert = () => {
    const { alert, setAlert } = CryptoState();
    return (

        <h1>Hello</h1>

    )
}

export default Alert
