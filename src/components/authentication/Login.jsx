import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../store/CryptoContext";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const { setOpenModal } = CryptoState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setOpenModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex lg:w-[29vw] sm:w-[65vw] pl-[0.8rem] flex-col"
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mt-1 rounded-lg text-black"
        name="email"
        type="text"
        placeholder="Enter Email"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded-lg text-black"
        name="password"
        type="password"
        placeholder="Enter Password"
      />
      <button
        type="submit"
        className="bg-[#EEBC1D] p-2 rounded-lg mt-5 w-[30%]  self-center"
      >
        {loading ? (
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          <h1>Login</h1>
        )}
      </button>
    </form>
  );
};

export default Login;
