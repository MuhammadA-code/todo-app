import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ resetData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      
      const token = localStorage.getItem("Authorization");
      token && navigate("/todos");
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-5"> Log in </h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmitLogin}>
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
          Log in
        </button>
      </form>
      <button onClick={resetData}>
        Don't have an account?
        <b className="text-yellow-600">Sign up</b>
      </button>
    </div>
  );
};

export default Login;
