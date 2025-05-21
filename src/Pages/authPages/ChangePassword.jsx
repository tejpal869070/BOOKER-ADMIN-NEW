import React, { useState } from "react";
import bg1 from "../../assets/photos/security-bg.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading1 } from "../../Componentes/Loading1";
import { ChangePasswordControll } from "../../Controllers/User/UserController";
import Logo from "../../assets/photos/logo.png";

export default function ChangePassword() {
  const [resetting, setResetting] = useState(false);

  const sessionMobile = sessionStorage.getItem("mobile");

  const [user, setUser] = useState({
    mobile: "",
    password: "",
    new_password: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const resetPassord = async (e) => {
    e.preventDefault();
    setResetting(true);
    if (user.mobile !== sessionMobile) {
      toast.error("Please check mobile number.");
      setResetting(false);
      return;
    } else if (user.password.length < 6) {
      toast.error("Enter a valid old password");
      setResetting(false);
      return;
    } else if (user.new_password.length < 6) {
      toast.error("New password should be 6 digit long.");
      setResetting(false);
      return;
    }

    try {
      const response = await ChangePasswordControll(user);
      if (response.error === false) {
        sessionStorage.removeItem("mobile");
        sessionStorage.removeItem("token");
        toast.success("Password reset success!", {
          position: "top-center",
        });
        toast.success("Please Login Again!");
        setResetting(false);

        setTimeout(function () {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(response.message);
        setResetting(false);
      }
    } catch (error) {
      setResetting(false);
      toast.error("Something went wrong");
    }
  };

  const { mobile, password, new_password } = user;
  return (
    <div className="dark:bg-black">
      <section
        className="bg-no-repeat bg-center	bg-cover "
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="w-full flex justify-center items-center">
          <Link
            to={{ pathname: "/home", search: `?dashboard` }}
            className="flex items-center "
          >
            <img src={Logo} className="h-20" alt="bLogo" />
          </Link>
        </div>
        <div className="flex flex-col items-center mt-6  px-6 py-8   mx-auto  h-screen lg:py-0">
          <div className="w-full p-6 bg-[#ffffffbd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={resetPassord}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+91-**********"
                  required=""
                  value={mobile}
                  onChange={handleDataChange}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={handleDataChange}
                />
              </div>
              <div>
                <label
                  for="new_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={new_password}
                  onChange={handleDataChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[blue] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {resetting ? <Loading1 width={40} /> : "Reset Password"}
              </button>
            </form>
            <div className="text-center dark:text-gray-300 mt-4 font-semibold  underline">
              <Link to={"/home"}>Go Back </Link>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
