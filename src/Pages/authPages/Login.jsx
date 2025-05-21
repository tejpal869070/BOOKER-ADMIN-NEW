import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg1 from "../../assets/photos/stadium2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Loading1 } from "../../Componentes/Loading1";
import { userLogin } from "../../Controllers/Auth/AuthController";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

export default function Login() {
  const [creating, setCreating] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const userData = {
    username: username,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("first")
    setCreating(true);
    if (username === "") {
      toast.error("username required");
      setCreating(false);
      return;
    } else if (password.length < 6) {
      toast.error("Please enter a valid password");
      setCreating(false);
      return;
    }
    try {
      const response = await userLogin(userData); 
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("mobile", username);
      toast.success("Login Successfull");
      setCreating(false);
      setTimeout(function () {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) { 
      toast.error(error?.response?.data?.message);
      setCreating(false);
      return;
    }
  };

  return (
    <div
      className="min-h-screen  bg-fixed  bg-no-repeat bg-cover bg-black     py-6 flex flex-col justify-center px-6 lg:px-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg1})`,
      }}
    >
      <ToastContainer />
      <div className="relative py-3   sm:max-w-xl sm:mx-auto">
        {/* <div className="absolute inset-0 backdrop-blur-sm bg-cyan-400  shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6  rounded-3xl"></div> */}
        <div className="relative px-4 py-8 bg-white/30 backdrop-blur-sm shadow-lg  rounded-3xl sm:p-20 animate-fade-right">
          <div className="max-w-md mx-auto">
            <div>
              <img
                src={require("../../assets/photos/mainlogo.png")}
                alt="logo"
                className="w-40 m-auto"
              />
              <h1 className="text-xl font-bold text-center">ADMIN LOGIN</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleLogin}>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <FaUserCircle
                      size={20}
                      className="  absolute top-2.5 left-2"
                    />
                    <input
                      id="Mobile"
                      name="Mobile"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                      placeholder="username"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <MdOutlineSecurity
                      size={20}
                      className="  absolute top-2.5 left-2"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer rounded pl-10 h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <FaEye
                        className="mt-1 ml-[-25px] cursor-pointer"
                        onClick={ShowPassword}
                      />
                    ) : (
                      <IoEyeOff
                        className="mt-1 ml-[-25px] cursor-pointer"
                        onClick={ShowPassword}
                      />
                    )}
                  </div>
                  <div className="relative ">
                    <button
                      className="relative mt-4 w-full"
                      type="submit"
                      disabled={creating}
                    >
                      <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                      <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black   px-3 py-1 text-base font-bold text-black transition duration-100  bg-yellow-400 hover:text-gray-900">
                        {creating ? <Loading1 width={30} /> : "LOGIN"}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
