import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./navbar";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(true);
  const { login } = useContext(AuthContext);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setLoggedIn(true);
    }
  }, []);

  function resetData() {
    setPage(!page);
    setEmail("");
    setPassword("");
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      //await login(email, password);
      const userSession = { email: email, token: "dummyToken" };
      localStorage.setItem("session", JSON.stringify(userSession));
      setLoggedIn(true);
      navigate("/todos");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed.");
    }
  };

  // if (loggedIn || registered) {
  //   return (
  //     <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-24 bg-white min-w-[200px] min-h-[200px]">
  //       <ToastContainer />
  //     </div>
  //   );
  // }

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
            {page === true ? (
              <Login resetData={resetData}></Login>
            ) : (
              <Navigate to="/sign_up" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
