import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bg1 from "../../assets/photos/stadium2.jpg";
 import { ToastContainer, toast } from "react-toastify";import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.css";
import {
  CheckUserExistance,
  SendOtp,
} from "../../Controllers/Auth/AuthController";
import { Loading1 } from "../../Componentes/Loading1";
import OtpVerify from "./OtpVerify";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const location = useLocation();
  const [otp, setOtp] = useState("");
 
  const getQueryParam = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };

  const refferCode = getQueryParam("referrer_code");
  const userPosition = getQueryParam("position");

  const [reffer_by, setRefferBy] = useState(refferCode);

  const formData = {
    name: name,
    email: email,
    mobile: mobile,
    password: password,
    reffer_by: reffer_by || "5Zw8gbwv",
    position: userPosition || "L",
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      toast.error("All Details Are Required");
      setLoading(false);
      return;
    } else if (mobile.length !== 10) {
      toast.error("Invalid Mobile Number");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      toast.error("Password must be 6 digit long.");
      setLoading(false);
      return;
    }
    try {
      const response = await CheckUserExistance(formData);
      if (!response.status) {
        toast.error("Email or Mobile already exists");
        setLoading(false);
        return;
      }
      try {
        const otpResponse = await SendOtp(formData);
        if (otpResponse.status) {
          setOtpSent(true);
          setLoading(false);
          setOtp(otpResponse.data[0].otp);
        } else {
          toast.error("Error in sending OTP");
        }
      } catch (error) {
        toast.error("Error in sending OTP");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error occurred during registration");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setOtpSent(false);
  };

  return (
    <div
      className="min-h-screen  bg-fixed  bg-no-repeat bg-cover  py-6 px-6 lg:px-0 flex flex-col justify-center sm:py-12 "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg1})`,
      }}
    >
      <ToastContainer />
      {!otpSent ? (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-8 bg-white/30 backdrop-blur-sm shadow-lg  rounded-3xl sm:px-16 animate-fade-left">
            <div className="max-w-md mx-auto ">
              <div>
                <img
                  src={require("../../assets/photos/mainlogo.png")}
                  alt="logo"
                  className="w-40 m-auto"
                />
                <h1 className="text-xl font-bold text-center">SIGN UP</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleRegister}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <FaRegCircleUser
                        size={20}
                        className="  absolute top-2.5 left-2"
                      />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <HiOutlineMailOpen
                        size={20}
                        className="  absolute top-2.5 left-2"
                      />
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <BiSolidPhoneCall
                        size={20}
                        className="  absolute top-2.5 left-2"
                      />
                      <input
                        autocomplete="off"
                        id="mobile"
                        name="mobile"
                        type="text"
                        className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                        placeholder="Mobile No."
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <MdOutlineSecurity
                        size={20}
                        className="  absolute top-2.5 left-2"
                      />
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <TbUsersPlus
                        size={20}
                        className="  absolute top-2.5 left-2"
                      />
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="text"
                        className="peer pl-10 rounded  h-10 w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:border-b-2 focus:border-gray-500 focus:outline-none"
                        placeholder="Referral code"
                        value={reffer_by}
                        onChange={(e) => setRefferBy(e.target.value)}
                      />
                    </div>
                    <div className="relative mt-10">
                      {/* <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button> */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full text-center cursor-pointer"
                      >
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                        <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black   px-3 py-1 text-base font-bold text-black transition duration-100 bg-yellow-400 hover:text-gray-900">
                          {loading ? (
                            <Loading1 width={40} />
                          ) : (
                            <span>Register</span>
                          )}
                        </span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 font-semibold">
                      Already have an account?{" "}
                      <Link to={"/login"} className="underlined text-blue-500">
                        Login Now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OtpVerify goBack={goBack} formData={formData} recivedOtp={otp}/>
      )}
    </div>
  );
}
