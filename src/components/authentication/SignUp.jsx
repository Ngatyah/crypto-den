import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Password do not match");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex lg:w-[29vw] sm:w-[65vw] pl-[0.8rem] flex-col "
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="p-2 mt-1 rounded-lg text-black"
        name="email"
        type="text"
        placeholder="Enter Email"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="p-2 rounded-lg text-black"
        name="password"
        type="password"
        placeholder="Enter Password"
      />
      <label htmlFor="confirm">Confirm Password</label>
      <input
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
        className="p-2 rounded-lg text-black"
        name="confirm"
        type="password"
        placeholder="Confirm Password"
      />
      <button
        type="submit"
        className="bg-[#EEBC1D] p-2 rounded-lg mt-5 w-[30%] self-center"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
