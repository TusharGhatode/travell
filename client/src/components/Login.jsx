import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      const res = response.data.data
      

      if(res.email === 'admin@gmail.com'){
        localStorage.setItem('email',email)
        localStorage.setItem('role','admin')

        navigate('/admin')
      }else{
        localStorage.setItem('email',email)
        localStorage.setItem('role','client')
        localStorage.setItem('clientId',res._id)


        navigate('/')
      }

     
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        const status = error.response.status;

        

        if (status === 401) {
          
          alert(error.response.data.message); // Show "Invalid password"
        } else if (status === 404) {
          
          alert(error.response.data.message); // Show "Email not found"
        } else if (status === 500) {
         
          alert("Server error. Please try again later."); // Handle server error
        } else {
          console.error("Unexpected error:", error.response.data);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received from server:", error.request);
      } else {
        // Something else caused the error
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="p-8">
      <h1 className='text-red-500 font-bold'>This is a free server, so it takes an initial load of 30 seconds; after that, you have a smooth experience. Thank you.</h1>
      <h1>Try these crediantials for a demo.</h1>
      <p><span className="font-bold inline-block">Email:</span> admin@gmail.com</p>
      <p><span className="font-bold inline-block">Password:</span> 1234</p>
      </div>


      <div className="sm:block hidden -mt-20">
        <div className="relative flex flex-wrap justify-center items-center h-screen">
          <div className="relative flex bg-white mx-1 rounded-xl shadow sm:shadow-lg sm:shadow-gray-400 w-screen sm:w-[95vw] lg:w-[90vw] xl:w-[65vw]">
            <div className="w-1/2 px-6 py-8">
              <h1 className="text-center font-bold sm:text-lg">Login</h1>
              <div className="mt-5 grid grid-cols-1 gap-4">
                <div>
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm"
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-1">
                <button
                  className="inline-block w-full px-6 py-3 sm:py-4 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-orange-700 to-orange-400"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="right bg-gradient-to-tl from-orange-700 rounded-r-xl to-orange-400 w-1/2 sm:flex flex-wrap justify-center items-center flex-col">
              <div className="text-center">
                <h1 className="text-md sm:text-xl lg:text-2xl text-white font-extrabold">
                  Welcome to Login
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center">
                <div>
                  <a className="text-xs sm:text-md flex mt-6 text-white font-bold uppercase cursor-pointer">
                    Don't have an account?
                    <p
                      className="text-black font-bold ml-1 hover:underline"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block sm:hidden  -mt-20">
        <div className="relative py-3 flex flex-wrap justify-center items-center h-screen">
          <div className="relative flex bg-white w-full mx-1 rounded-xl shadow-lg shadow-gray-400">
            <div className="px-6 py-8 w-full">
              <h1 className="text-center font-bold sm:text-lg">Login</h1>
              <div className="mt-5 grid grid-cols-1 gap-4">
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
                    required
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
                    className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm w-full"
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="inline-block w-full px-6 py-3 sm:py-4 font-bold text-center text-white uppercase bg-gradient-to-tl from-orange-700 to-orange-400"
                onClick={handleSubmit}
              >
                Login
              </button>

              <div className="flex flex-wrap items-center justify-center">
                <div>
                  <a className="text-xs flex mt-6 text-black font-bold uppercase cursor-pointer">
                    Don't have an account?
                    <p
                      className="text-orange-500 font-bold ml-1 hover:underline"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
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

export default Login;
