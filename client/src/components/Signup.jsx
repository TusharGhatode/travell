import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {
        alert('Signup Successfull')
        navigate('/login') 
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        
        alert('Email exist'); 

        alert(error.response.data.message);
      } else {
       
        alert('Email exist'); 

      }
    }
  };
  

  return (
    <div className="bg-gray-100">
      <div className="sm:block hidden">
        <div className="relative  flex flex-wrap justify-center items-center h-screen">
          <div className="relative flex bg-white mx-1 rounded-xl shadow  sm:shadow-lg sm:shadow-gray-400 w-screen sm:w-[95vw] lg:w-[90vw] xl:w-[65vw] ">
            <div className="w-1/2 px-6 py-8">
              <h1 className="text-center font-bold sm:text-lg">Signup</h1>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="fullName"
                  >
                    Name
                  </label>
                  <input
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300  py-3 mt-1 mb-2 text-sm w-full"
                    type="text"
                    id="fullName"
                    value={fullName}
                    required
                    placeholder="Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300  mt-1 mb-2 text-sm w-full"
                    type="email"
                    required
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300  py-3 mt-1 mb-2 text-sm "
                    type="text"
                    required
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-1">
                <button
                  className="inline-block w-full px-6 py-3 sm:py-4 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-orange-700 to-orange-400 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:bg-pink-700 active:opacity-85"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="right bg-gradient-to-tl from-orange-700 rounded-r-xl to-orange-400 w-1/2 sm:flex flex-wrap justify-center items-center flex-col">
              <div className="text-center">
                <h1 className=" text-md sm:text-xl lg:text-2xl text-white font-extrabold ">
                  Welcome to Signup
                </h1>
              </div>

              <div className=" flex flex-wrap items-center justify-center">
                <div className="">
                  <a className="text-xs sm:text-md flex sm:text-md mt-6 text-white font-bold uppercase cursor-pointer dark:text-gray-400">
                    Have an account?
                    <p
                      className="text-black font-bold  ml-1 hover:underline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block sm:hidden">
        <div className="relative py-3 flex flex-wrap justify-center items-center h-screen">
          <div className="relative flex bg-white w-full mx-1 rounded-xl shadow-lg shadow-gray-400 ">
            <div className=" px-6 py-8 w-full">
              <h1 className="text-center font-bold sm:text-lg">Sign Up</h1>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="fullName"
                  >
                    Name
                  </label>
                  <input
                    className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
                    type="text"
                    id="fullName"
                    required
                    placeholder="Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm w-full"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm w-full"
                    type="text"
                    required
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="inline-block w-full px-6 py-3 sm:py-4 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-orange-700 to-orange-400 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:bg-pink-700 active:opacity-85"
                onClick={handleSubmit}
              >
                Sign Up
              </button>

              <div className=" flex flex-wrap items-center justify-center">
                <div className="">
                  <a className="text-xs flex mt-6 text-black font-bold uppercase cursor-pointer dark:text-gray-400">
                    Have an account?
                    <p
                      className="text-orange-500 font-bold  ml-1 hover:underline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
