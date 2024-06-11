import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const Signup = ({ resetData, setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      setPage(true)
    } catch (error) {
      toast.error("Sign up failed.");
    }
  };

  return (
    <div>
      <Navbar logged={false}/>
      <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-24 bg-white ">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8 h-1/2 ">
          <img
            src="/login2.png"
            alt="login image"
            className="w-full h-full object-cover"
          ></img>
        </div>
        <div className="flex flex-col p-8 md:p-24 bg-white w-full md:w-auto b-2 border border-solid border-opacity-40 items-center border-black drop-shadow-2xl">
          <div>
            <h1 className="text-4xl mb-5"> Sign up </h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmitSignup}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-300 text-black p-2 w-full rounded hover:bg-blue-500 mt-3"
              >
                Sign up
              </button>
            </form>
            <button onClick={() => navigate("/sign_in")}>
              Already have an account?
              <b className="text-yellow-600">Log in</b>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
