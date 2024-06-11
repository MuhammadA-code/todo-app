import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Navbar = ({ logged }) => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
  };
  const handleLogout = () => {
    localStorage.removeItem('Authorization')
    navigate("/sign_in");
  };
  return (
    <div className="bg-[#00008B] flex justify-between items-center h-24 max-w-[1550px] mx-auto px-4 text-white">
      {console.log(logged)}
      <h1 className="w-full text-3xl font-bold text-yellow-600">ToDo.</h1>

      {logged && (
        <div className="hidden md:flex">
          <button
            className="p-4 hover:bg-yellow-600 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold  text-yellow-600 m-4">
          ToDo.
        </h1>
        {logged && (
          <button
            className="p-4 border-b rounded-xl hover:bg-yellow-600 duration-300 hover:text-black cursor-pointer border-gray-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
