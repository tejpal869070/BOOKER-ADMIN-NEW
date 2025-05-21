import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa6";

export default function AstroHome() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    // Toggle the expanded index on click
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div>
      {/* --------------Nav bar-------------------------------------------------------------- */}
      <nav className="bg-[#fff6ea] border-gray-200 py-2.5 ">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <img
              src={require("../assets/a/logo.png")}
              className="h-20 mr-3 sm:h-14"
              alt="Landwind Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>

            <a className="hidden md:block text-gray-100 bg-[#800000] cursor-pointer font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">
              Get Consultation
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="true"
              onClick={() => {
                document
                  .getElementById("mobile-menu-2")
                  .classList.toggle("hidden");
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Gems
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Horoscope
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ========================================--------------------------------------------- */}

      <div className="max-w-7xl mx-auto">
        <div
          id="default-carousel"
          className="relative rounded-lg overflow-hidden shadow-lg"
          data-carousel="static"
        >
          {/* large device---- */}
          <div
            className="hidden md:block  relative h-80 md:h-96"
            data-carousel-inner
          >
            <img alt="banner" src={require("../assets/a/img1.jpg")} />
          </div>

          {/* mobile------ */}
          <div className=" md:hidden relative  " data-carousel-inner>
            <img alt="banner" src={require("../assets/a/img8.jpg")} />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------ */}
      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto   sm:px-6  ">
        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12   md:mt-16 lg:mt-20   xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-5xl">
              <span className=" xl:inline">Unlock the Secrets of Your Stars </span>
              <span className=" text-[#800000] xl:inline">
                with Grahsalah Astrology
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              We are dedicated to providing the most accurate and insightful
              astrology readings.We ensures you get the best guidance based on
              your unique birth chart. Trust us to offer reliable and
              personalized astrology services, helping you navigate life with
              clarity.
            </p>
            <div className="mt-5 sm:mt-8  flex sm:justify-center gap-4 lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#800000]   md:py-4 md:text-lg md:px-10"
                >
                  Make Appointment
                </a>
              </div>
              <div className="  sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Contact Now
                </a>
              </div>
            </div>
          </div>

          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={require("../assets/a/img9.jpg")}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      <div className="  p-4  pt-0">
        <div className="max-w-7xl mx-auto   md:px-12 xl:px-6">
          <div className="mt-16 grid divide-x divide-y  divide-gray-700 overflow-hidden  rounded-3xl border text-gray-600 border-gray-700 grid-cols-2 lg:grid-cols-4  lg:divide-y-0 xl:grid-cols-4">
            <div className="group relative bg-white-200 transition hover:z-[1] hover:shadow-2xl  hover:shadow-gray-600/10">
              <div className="relative space-y-4 py-12 p-4 lg:p-8">
                <img
                  src={require("../assets/a/img3.png")}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="w-16 h-16 rounded-full"
                  style={{ color: "transparent" }}
                />
                <div className="space-y-2">
                  <h5 className="text-xl font-bold text-[#800000] transition group-hover:text-secondary">
                    Xyz.com
                  </h5>
                  <p className="text-gray-700 font-semibold">
                    Platform to convert Domains into Content websites.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative bg-white-200 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-4 py-12 p-4 lg:p-8">
                <img
                  src={require("../assets/a/img4.webp")}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="w-16 h-16 rounded-full"
                  style={{ color: "transparent" }}
                />
                <div className="space-y-2">
                  <h5 className="text-xl font-bold text-[#800000] transition group-hover:text-secondary">
                    ABC.com
                  </h5>
                  <p className="text-gray-700 font-semibold">
                    Platform to create dynamic widgets for websites.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative bg-white-200 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-4 py-12 p-4 lg:p-8">
                <img
                  src={require("../assets/a/img5.png")}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="w-16 h-16 rounded-full"
                  style={{ color: "transparent" }}
                />
                <div className="space-y-2">
                  <h5 className="text-xl font-bold text-[#800000] transition group-hover:text-secondary">
                    ASD.com
                  </h5>
                  <p className="text-gray-700 font-semibold">
                    API SaaS Platform that provides API Suit to help you ship
                    fast.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative bg-white-200 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-4 py-12 p-4 lg:p-8">
                <img
                  src={require("../assets/a/img6.png")}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="w-16 h-16 rounded-full"
                  style={{ color: "transparent" }}
                />
                <div className="space-y-2">
                  <h5 className="text-xl font-bold text-[#800000] transition group-hover:text-secondary">
                    TMK.co
                  </h5>
                  <p className="text-gray-700 font-semibold">
                    Chrome Extension that lets you add ChatGPT on any website
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------- */}
      <div className="flex flex-col justify-center items-center px-4">
        {/* <div className="p-1 grid grid-cols-3 md:grid-cols-9 lg:grid-cold-9 gap-3 max-w-7xl">
          {plants2.map((plant, index) => (
            <div
              className={`flex-shrink-0 relative overflow-hidden bg-[#800000] rounded-lg max-w-xs shadow-lg`}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{
                  transform: "scale(1.5)",
                  opacity: 0.1,
                }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2,
                  }}
                ></div>
                <img className="relative w-40" src={plant.image} alt="" />
              </div>
              <div className="relative text-white text-center   pb-6 mt-6">
                <div className="  text-center text-xl font-semibold">
                  {plant.name}
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <h1 className="mx-auto my-16 max-w-4xl text-center     font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Make your photos{" "}
          <span className="relative whitespace-nowrap  text-[#800000]">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="relative">Pop</span>
          </span>
        </h1>
        <div className="max-w-7xl mx-auto  flex flex-wrap justify-center gap-3    ">
          {cards9.map((item, index) => (
            <div
              key={index}
              className="bg-[#8b1e1e] w-[30%] md:w-[15%] shadow-lg rounded-xl flex flex-col items-center justify-center p-4 "
            >
              <img alt="soncs" src={item.img} className="w-16" />
              <p className="text-center text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------- */}
      <div className="w-full m-auto flex justify-center ">
        <div className="p-10 sm:p-10 sm:py-28 max-w-7xl  m-auto m-5 rounded-3xl    dark:text-white  bg-[#fff6ea] text-black flex items-center justify-center overflow-hidden  ">
          <div className="w-full max-w-7xl px-4 sm:px-6 m-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative flex items-center sm:m-10 px-4">
                <div className="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-yellow-500 rotate-12 rounded-lg border-yellow-700 border-b-4 border-r-8 max-sm:hidden">
                  <img
                    alt="logo"
                    src={require("../assets/a/imh2.png")}
                    className="w-full"
                  />
                </div>
                <div className="relative z-10 bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap border-slate-950 border-b-4 border-r-8">
                  <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-50 dark:text-gray-50">
                    Bold. Strong. Raw.
                  </h2>
                  <p className="mt-1 text-sm sm:text-base font-light text-gray-400 dark:text-gray-400">
                    Embrace minimalism with maximal impact.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center text-center md:text-left z-10">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-5xl">
                  <span className=" xl:inline">
                    Unlock the Secrets of Your Stars{" "}
                  </span>
                  <span className=" text-[#800000] xl:inline">
                    with Grahsalah Astrology
                  </span>
                </h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400 dark:text-gray-400 text-gray-700 text-balance">
                  Brutal aesthetics for a bold web presence. Build without
                  compromise.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
                  <a
                    href="#get-started"
                    className="rounded-sm p-3 grow text-center bg-[#800000] text-white font-bold uppercase text-sm tracking-widest hover:bg-yellow-600 transition"
                  >
                    Get Started
                  </a>
                  <a
                    href="#learn-more"
                    className="rounded-sm p-3 grow border text-center border-[#800000] text-[#800000] font-bold uppercase text-sm tracking-widest hover:bg-yellow-500 hover:text-black transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-[#800000] dark:text-white md:text-5xl">
            NeuroGraph AI Assistant
          </h2>
          <div className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
            <p className="text-lg text-gray-700 dark:text-gray-700 font-semibold">
              NeuroGraph AI Assistant simplifies complex workflows by offering
              intelligent, automated insights to streamline your tasks.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              Task Automation
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Automate repetitive tasks with NeuroGraph's intuitive and
              intelligent task manager.
            </p>
          </div>
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              Data Analysis
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Gain actionable insights from your data with NeuroGraph's
              AI-powered analysis.
            </p>
          </div>
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              Personalized Recommendations
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Receive tailored suggestions to improve productivity and
              efficiency in real time.
            </p>
          </div>
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              Seamless Integrations
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Connect NeuroGraph with your favorite tools for a unified
              workflow.
            </p>
          </div>
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              Advanced Reporting
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Generate detailed reports to track performance and identify
              trends.
            </p>
          </div>
          <div className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4">
            <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
              <img
                src="https://www.svgrepo.com/show/530666/gene-sequence.svg"
                alt="Icon"
                className="h-12"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
              NeuroGraph API
            </p>
            <p className="text-gray-700 dark:text-gray-700 font-semibold">
              Access robust APIs to embed NeuroGraph’s capabilities into your
              own applications.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <div className="flex flex-col items-center justify-center">
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4  mt-6 ">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out"
          >
            Inspired by the amazing
            <span className="font-semibold">restorePhotos</span> app
          </a>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
            Make your photos{" "}
            <span className="relative whitespace-nowrap  text-orange-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">Pop</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7">
            Want to style up your life? your color of choice. 100% free – pop
            your photos today.
          </p>
        </main>
        <div className="p-1 flex flex-wrap items-center justify-around max-w-7xl">
          {plants.map((plant, index) => (
            <div
              className={`flex-shrink-0 mb-4  relative overflow-hidden bg-[#309ac9ad] rounded-lg w-[45%] md:w-[20%]  shadow-lg`}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{
                  transform: "scale(1.5)",
                  opacity: 0.1,
                }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2,
                  }}
                ></div>
                <img className="relative w-40" src={plant.image} alt="" />
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <div className="text-center font-semibold text-xl">
                  {plant.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="max-w-7xl mt-12 mx-auto rounded-3xl bg-gradient-to-r from-green-100 to-green-50  py-16 text-center overflow-hidden">
        <div className="relative m-auto max-w-xl">
          <div className="flex flex-row items-center justify-center text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-auto w-10 fill-current"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-auto w-10 fill-current"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-auto w-10 fill-current"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-auto w-10 fill-current"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-auto w-10 fill-current"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <a href="#" target="_blank">
            <h2 className="mt-4 font-dm-sans text-mobile-h3 font-semibold leading-snug sm:text-mobile-h2 md:text-desktop-h2">
              An
              <span className="font-bold underline underline-offset-2">
                absolute 5/5
              </span>{" "}
              rating
            </h2>
          </a>
          <p className="mt-4 font-dm-sans text-desktop-paragraph text-slate-body">
            Reviews are from paid customers and Product Hunt community
          </p>
          <svg
            className="absolute top-48 lg:top-24 -left-2 lg:-left-10  h-36 fill-current text-slate-body  md:-left-14 md:h-44"
            viewBox="0 0 644 947"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_32_70)">
              <path d="M292 4.3c-59.5 27-88.1 53.2-99.1 90.8-1.7 6-2.2 10.9-2.6 26.1-.5 17.7-.4 18.9 1.6 22.1 1.1 1.8 3.2 3.9 4.6 4.5 9.4 4.3 33.5-2.6 50-14.3 7.6-5.4 19.8-18.1 25.3-26.5 5.2-7.9 13-23.8 16.7-34 4.9-13.9 9.7-34 10-42.4.2-4.5 1.3-12.8 2.4-18.6 2.4-11.9 2.4-12 1.4-12-.5 0-5.1 2-10.3 4.3zM137.2 39.2c-16 29.9-25.1 54.2-28.8 76.8-2.2 13.2-1.3 44 1.6 55.7 3.7 15.6 12 31.3 20.5 39.2 3.7 3.4 5.1 4.1 8.6 4.1 8.4 0 18.2-9.6 26-25.5 5.4-11 10.3-28.2 9.5-33-.5-2.3-.4-2.7.5-1.5.8 1.2 1 1 .5-1-.2-1.4-.1-6.8.3-12 1.5-17.2-1.1-35.6-8-56-4.1-12.4-13.1-32.8-20.1-45.8l-5.5-10.4-5.1 9.4zM264.5 133.4c-21.4 7.2-30 10.7-42.3 17.1-34.4 18.2-55.4 41.3-63.2 69.5-2.4 9-4.7 29.8-3.5 32.6 1 2.4 1.2 3 1.4 4.9.2 3.2 5.5 7.5 10.1 8.3 5.1.9 21.4-.3 24.8-1.8 1.2-.5 2.2-.8 2.2-.6 0 .2-5.1 4.2-11.2 8.9-35 26.5-53.8 50.8-61.4 79.2-1.4 5.4-1.9 10.6-1.9 22.5 0 8.5.4 16.8.8 18.5.5 2.2.5 2.6-.3 1.5-.7-1.1-.8.2-.4 4.5 2.2 20.5 13.1 22.7 39.4 7.8 9.8-5.5 18.3-12.4 24.3-19.8 5.4-6.7 14.2-23.3 18-34 3.5-9.8 8-30.3 7.2-33.3-.4-1.7-.2-2.2.6-1.6.9.5 1 0 .6-1.8-.4-1.3 0-7.4.8-13.4s1.7-18.1 2-26.9c.7-17.8 1.2-22.6 2.4-22.2 1.7.4 14.1-9.6 21.4-17.3 12.2-12.9 21.3-28 30.7-51 7.1-17.4 11.1-32.4 8.1-30.5-1 .5 2.6-13.6 5.4-21.5 1.7-4.9 1.7-5 .8-5-.5 0-8 2.4-16.8 5.4zM69.7 167.5c-6.1 20.4-7.9 26.9-10.1 37-4.5 21-5.9 35.2-5.1 52 .4 8.2.7 16.1.7 17.5.1 10.9 4.6 28.6 10 39.5C71 325 81.5 338 89.9 344.1c6.1 4.4 10.9 5.1 16.2 2.4 3.6-1.9 8.6-9.6 12.2-18.6 5.9-14.8 7.2-24.1 7.1-49.9 0-12.6-.4-17-2.2-23.7-6-22.3-18.2-44.6-39.5-71.8-14.2-18.1-13.3-17.2-14-15zM17.6 327.7c.5 7.6.9 16.8.9 20.5 0 3.6.2 6.3.5 5.8.3-.4.6 2.2.7 5.8.2 9 4.6 31.1 8.9 44.1 10.6 32.6 29 55 55.6 67.6 18.5 8.8 27.1 4.1 28.6-15.8.4-4.5.7-15.9.6-25.2 0-16.5-.1-17.3-3.3-26.5-9.1-26.6-28.1-48.6-61.3-70.8-8.6-5.8-30.6-19.2-31.4-19.2-.4 0-.2 6.2.2 13.7zM195.9 379.7c-39.8 41.9-57.6 78.4-55.4 113.8.3 6 .8 14.6 1 19 .7 13.7 5.8 28.5 11.2 32 6.9 4.6 14.8 2.2 27.6-8.2 12.1-10 20.8-21.3 26.4-34.6 4.1-9.8 7.4-22.3 7.8-30.2.2-3.3.9-11.4 1.5-18 1.2-12.1.8-29-1.1-43.5-1.5-11.9-7.2-41-8-41-.4 0-5.3 4.8-11 10.7z"></path>
              <path d="M0 455.7c0 .2 1.8 4 4.1 8.4 4.7 9.5 6.2 13.2 5 12.5-1.5-1-1.8 3.9-.6 8.7 3.1 12.1 26.5 46.8 41.2 60.8C62.1 558 77.8 568.3 88 571.2c3.6 1 4.9 1.6 3 1.3-1.9-.3-7.8-1.2-13-2-11.7-1.7-35.3-3.5-47.7-3.5H21l5.3 8.2c7.2 11.2 7.2 11.2 5.9 10.4-1.8-1.1-2.6 4.1-1.3 8.4 2.5 8.4 26.1 37.6 40.4 50.2 9.5 8.3 22.2 16.8 30.4 20.5 9.8 4.3 19.4 7.3 24.2 7.4l4.6.1-4.5.8c-2.5.5-12.4 2.1-22 3.6s-17.7 2.9-18 3.1c-.2.2 0 .7.5 1.1 2.7 1.9 13.8 14.4 12.3 13.9-1.8-.6-2.8 1-2.8 4.7 0 3.8 5.3 10.8 14.1 18.7 34.9 31.3 63.1 45 93.9 45.3 6.3 0 13.1-.2 15-.7 1.9-.4-3.5 1.7-12 4.6-23.6 8.2-31 11-31 11.7 0 .3 2.9 2.8 6.5 5.4 5.5 4 10.2 8.4 6.7 6.2-1.3-.8-3.2 2.4-3.2 5.4 0 9.9 48.6 36.1 79 42.6 12.5 2.7 32.7 2.5 44.4-.4 11.3-2.8 26.1-9.8 30.9-14.5 3.9-4 5.6-9.2 3.8-12.4-.8-1.7-.4-2.4 2.9-4.9 2.2-1.6 4-3.2 4-3.6 0-.4-2.6-4-5.8-8-16.2-20.3-36.8-32.8-60.8-36.9-8.9-1.5-36.8-.6-47.4 1.5-13.1 2.6-14.7 2.6-5.9.3 5.1-1.3 10.2-3.4 12.2-5 3.8-2.9 6.1-8.4 5.1-12.3-.5-1.8.1-2.6 2.5-3.9 1.7-.8 3.1-1.9 3.1-2.3 0-.4-1.6-3.8-3.5-7.5-16.3-31.7-42.4-50.1-78.1-54.8-11.3-1.5-12.7-1.9-9.1-3 5.1-1.4 8.4-5.8 8.9-11.8.1-2 .9-3.3 2-3.7 2.3-.7 2.3-.6-1.2-11.4-10.8-32.9-30.5-53.4-64-66.2-4.1-1.5-5.9-2.5-4-2.1 1.9.5 8.2.8 14 .8 8.1 0 11.3-.4 14.2-1.8 3.9-2 7.3-7.6 6.5-10.7-.3-1.2.2-2 1.4-2.3 2.3-.6 2.3-2.1.4-12.4-6.1-32-24.9-56.8-54.4-71.8-15.7-7.9-39.4-14.7-66.6-19-8.8-1.3-17-2.6-18.2-2.9-1.3-.2-2.3-.2-2.3.1z"></path>
              <path d="M220.7 504.8c-30.5 40.8-44.3 75.7-42.2 106.7.3 5.5.8 14 1 19 .5 11.3 3 20.4 8.3 29.3 4.4 7.4 8.8 11.8 12.8 12.8 10.2 2.6 33.9-21.8 42.2-43.3 3.4-8.7 6.7-23.5 5.8-25.8-.3-.9-.1-3.9.5-6.8.5-2.8 1-11.7 1-19.7.1-15.5-1.5-28.4-5.7-45.5-3.3-13.7-11.7-40.5-12.6-40.5-.5 0-5.5 6.2-11.1 13.8zM277 582.1c-18.9 38.5-25.4 63.2-24.8 94.1.2 8.6.6 15.1 1 14.5.5-.7.5.2.2 1.9-1.9 9.8 7.7 35.4 18.1 48.7 7.6 9.6 14.1 12 21 7.7 7-4.3 19.5-24 23.9-37.5 2-6.3 4.6-19.7 4-20.7-.3-.4 0-5.4.6-11.1 2.6-25.7-5.1-55.3-24-92.2-4.2-8.3-8.7-16.5-9.8-18.4l-2.1-3.5-8.1 16.5zM344.5 638.2c-.2.7-1.4 7.8-2.7 15.8-1.9 12.3-2.2 18.8-2.3 43-.2 30.9.7 40.1 5 55.5 6.6 23.2 20.4 43 38.8 55.2 12 8 18.9 7 24.5-3.4 3.6-6.9 7.4-20.5 7.8-28.3.1-3 .5-10.9.9-17.5.9-13.5-.1-21.3-4.1-33.9-6.6-20.8-19.8-40.6-42.9-64.5-14.7-15.2-24.4-23.7-25-21.9zM430.1 730.2c5.2 12.9 6.9 17.9 5.9 17.3-.6-.4-1 1.2-1 4.2 0 7.8 11.5 31.3 25.2 51.4 21.5 31.7 52.9 50.9 83.2 50.9 12.4 0 16.6-2.7 18-11.2.1-1.1.8-2.3 1.5-2.7 1-.7 1.1-2.7.2-9.8-6.6-54.5-40.1-83.6-116.4-101.2-9.7-2.3-17.9-4.1-18.2-4.1-.3 0 .5 2.4 1.6 5.2zM383.2 818.1c-19.3 2.5-43.5 12.4-66.7 27.4-10.8 6.9-31.4 21.8-31.5 22.6 0 .4 2.8 1.6 6.3 2.9 6.6 2.4 9.2 4 6.5 4-1 0-1.9 1.2-2.3 3-1.4 6.5 4.5 10.5 22.6 15.4 57.2 15.5 98.2 9.3 127-19.4 7.5-7.4 10.1-13.1 8.1-17.4-.9-2.1-.6-3.1 2.9-7.7 2.1-2.9 3.9-5.5 3.9-5.8 0-.3-2.5-2.4-5.5-4.6-22.9-16.7-46.9-23.6-71.3-20.4zM612.333 854.83c-4.833 1.066-12.082 6.316-13.995 10.197-1.309 2.587-1.611 4.566-1.108 8.522.403 2.816.604 6.392.604 7.838-.201 7.229 6.243 14.686 14.6 16.741 13.895 3.5 28.696-3.957 29.401-14.839.101-2.13.806-5.402 1.41-7.381 1.007-2.815 1.007-4.565 0-7.685-3.122-10.577-16.815-16.513-30.912-13.393zM505.5 860.6c-27.6 4.6-58.7 22.7-93.5 54.1l-5.4 5 7.4 2.3c4.1 1.3 6.7 2.5 5.8 2.7-2.3.6-3.4 4.8-2 7.8 1.6 3.5 7.5 6.1 18.8 8.4 56.8 11.5 96.8 3.7 125-24.3 6.9-6.9 11-13 11.4-17.1.5-4.2 0-6.6-1.2-5.9-1.2.8-1.2.7 3.9-7.3 1.8-2.9 3.3-5.6 3.3-6.2 0-1.5-4.9-4.6-14.7-9.5-20.7-10.4-38.6-13.5-58.8-10z"></path>
            </g>
            <defs>
              <clipPath id="clip0_32_70">
                <path
                  transform="matrix(1 0 0 -1 0 946.016)"
                  d="M0 0H644V946.016H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
          <svg
            className="absolute top-48 lg:top-24 -right-2 lg:-right-10  h-36 fill-current text-slate-body  md:-right-14 md:h-44"
            viewBox="0 0 644 947"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_32_70)">
              <path d="M352 4.3c59.5 27 88.1 53.2 99.1 90.8 1.7 6 2.2 10.9 2.6 26.1.5 17.7.4 18.9-1.6 22.1-1.1 1.8-3.2 3.9-4.6 4.5-9.4 4.3-33.5-2.6-50-14.3-7.6-5.4-19.8-18.1-25.3-26.5-5.2-7.9-13-23.8-16.7-34-4.9-13.9-9.7-34-10-42.4-.2-4.5-1.3-12.8-2.4-18.6-2.4-11.9-2.4-12-1.4-12 .5 0 5.1 2 10.3 4.3zM506.8 39.2c16 29.9 25.1 54.2 28.8 76.8 2.2 13.2 1.3 44-1.6 55.7-3.7 15.6-12 31.3-20.5 39.2-3.7 3.4-5.1 4.1-8.6 4.1-8.4 0-18.2-9.6-26-25.5-5.4-11-10.3-28.2-9.5-33 .5-2.3.4-2.7-.5-1.5-.8 1.2-1 1-.5-1 .2-1.4.1-6.8-.3-12-1.5-17.2 1.1-35.6 8-56 4.1-12.4 13.1-32.8 20.1-45.8l5.5-10.4 5.1 9.4zM379.5 133.4c21.4 7.2 30 10.7 42.3 17.1 34.4 18.2 55.4 41.3 63.2 69.5 2.4 9 4.7 29.8 3.5 32.6-1 2.4-1.2 3-1.4 4.9-.2 3.2-5.5 7.5-10.1 8.3-5.1.9-21.4-.3-24.8-1.8-1.2-.5-2.2-.8-2.2-.6 0 .2 5.1 4.2 11.2 8.9 35 26.5 53.8 50.8 61.4 79.2 1.4 5.4 1.9 10.6 1.9 22.5 0 8.5-.4 16.8-.8 18.5-.5 2.2-.5 2.6.3 1.5.7-1.1.8.2.4 4.5-2.2 20.5-13.1 22.7-39.4 7.8-9.8-5.5-18.3-12.4-24.3-19.8-5.4-6.7-14.2-23.3-18-34-3.5-9.8-8-30.3-7.2-33.3.4-1.7.2-2.2-.6-1.6-.9.5-1 0-.6-1.8.4-1.3 0-7.4-.8-13.4s-1.7-18.1-2-26.9c-.7-17.8-1.2-22.6-2.4-22.2-1.7.4-14.1-9.6-21.4-17.3-12.2-12.9-21.3-28-30.7-51-7.1-17.4-11.1-32.4-8.1-30.5 1 .5-2.6-13.6-5.4-21.5-1.7-4.9-1.7-5-.8-5 .5 0 8 2.4 16.8 5.4zM574.3 167.5c6.1 20.4 7.9 26.9 10.1 37 4.5 21 5.9 35.2 5.1 52-.4 8.2-.7 16.1-.7 17.5-.1 10.9-4.6 28.6-10 39.5-5.8 11.5-16.3 24.5-24.7 30.6-6.1 4.4-10.9 5.1-16.2 2.4-3.6-1.9-8.6-9.6-12.2-18.6-5.9-14.8-7.2-24.1-7.1-49.9 0-12.6.4-17 2.2-23.7 6-22.3 18.2-44.6 39.5-71.8 14.2-18.1 13.3-17.2 14-15zM626.4 327.7c-.5 7.6-.9 16.8-.9 20.5 0 3.6-.2 6.3-.5 5.8-.3-.4-.6 2.2-.7 5.8-.2 9-4.6 31.1-8.9 44.1-10.6 32.6-29 55-55.6 67.6-18.5 8.8-27.1 4.1-28.6-15.8-.4-4.5-.7-15.9-.6-25.2 0-16.5.1-17.3 3.3-26.5 9.1-26.6 28.1-48.6 61.3-70.8 8.6-5.8 30.6-19.2 31.4-19.2.4 0 .2 6.2-.2 13.7zM448.1 379.7c39.8 41.9 57.6 78.4 55.4 113.8-.3 6-.8 14.6-1 19-.7 13.7-5.8 28.5-11.2 32-6.9 4.6-14.8 2.2-27.6-8.2-12.1-10-20.8-21.3-26.4-34.6-4.1-9.8-7.4-22.3-7.8-30.2-.2-3.3-.9-11.4-1.5-18-1.2-12.1-.8-29 1.1-43.5 1.5-11.9 7.2-41 8-41 .4 0 5.3 4.8 11 10.7z"></path>
              <path d="M644 455.7c0 .2-1.8 4-4.1 8.4-4.7 9.5-6.2 13.2-5 12.5 1.5-1 1.8 3.9.6 8.7-3.1 12.1-26.5 46.8-41.2 60.8-12.4 11.9-28.1 22.2-38.3 25.1-3.6 1-4.9 1.6-3 1.3 1.9-.3 7.8-1.2 13-2 11.7-1.7 35.3-3.5 47.7-3.5h9.3l-5.3 8.2c-7.2 11.2-7.2 11.2-5.9 10.4 1.8-1.1 2.6 4.1 1.3 8.4-2.5 8.4-26.1 37.6-40.4 50.2-9.5 8.3-22.2 16.8-30.4 20.5-9.8 4.3-19.4 7.3-24.2 7.4l-4.6.1 4.5.8c2.5.5 12.4 2.1 22 3.6s17.7 2.9 18 3.1c.2.2 0 .7-.5 1.1-2.7 1.9-13.8 14.4-12.3 13.9 1.8-.6 2.8 1 2.8 4.7 0 3.8-5.3 10.8-14.1 18.7-34.9 31.3-63.1 45-93.9 45.3-6.3 0-13.1-.2-15-.7-1.9-.4 3.5 1.7 12 4.6 23.6 8.2 31 11 31 11.7 0 .3-2.9 2.8-6.5 5.4-5.5 4-10.2 8.4-6.7 6.2 1.3-.8 3.2 2.4 3.2 5.4 0 9.9-48.6 36.1-79 42.6-12.5 2.7-32.7 2.5-44.4-.4-11.3-2.8-26.1-9.8-30.9-14.5-3.9-4-5.6-9.2-3.8-12.4.8-1.7.4-2.4-2.9-4.9-2.2-1.6-4-3.2-4-3.6 0-.4 2.6-4 5.8-8 16.2-20.3 36.8-32.8 60.8-36.9 8.9-1.5 36.8-.6 47.4 1.5 13.1 2.6 14.7 2.6 5.9.3-5.1-1.3-10.2-3.4-12.2-5-3.8-2.9-6.1-8.4-5.1-12.3.5-1.8-.1-2.6-2.5-3.9-1.7-.8-3.1-1.9-3.1-2.3 0-.4 1.6-3.8 3.5-7.5 16.3-31.7 42.4-50.1 78.1-54.8 11.3-1.5 12.7-1.9 9.1-3-5.1-1.4-8.4-5.8-8.9-11.8-.1-2-.9-3.3-2-3.7-2.3-.7-2.3-.6 1.2-11.4 10.8-32.9 30.5-53.4 64-66.2 4.1-1.5 5.9-2.5 4-2.1-1.9.5-8.2.8-14 .8-8.1 0-11.3-.4-14.2-1.8-3.9-2-7.3-7.6-6.5-10.7.3-1.2-.2-2-1.4-2.3-2.3-.6-2.3-2.1-.4-12.4 6.1-32 24.9-56.8 54.4-71.8 15.7-7.9 39.4-14.7 66.6-19 8.8-1.3 17-2.6 18.2-2.9 1.3-.2 2.3-.2 2.3.1z"></path>
              <path d="M423.3 504.8c30.5 40.8 44.3 75.7 42.2 106.7-.3 5.5-.8 14-1 19-.5 11.3-3 20.4-8.3 29.3-4.4 7.4-8.8 11.8-12.8 12.8-10.2 2.6-33.9-21.8-42.2-43.3-3.4-8.7-6.7-23.5-5.8-25.8.3-.9.1-3.9-.5-6.8-.5-2.8-1-11.7-1-19.7-.1-15.5 1.5-28.4 5.7-45.5 3.3-13.7 11.7-40.5 12.6-40.5.5 0 5.5 6.2 11.1 13.8zM367 582.1c18.9 38.5 25.4 63.2 24.8 94.1-.2 8.6-.6 15.1-1 14.5-.5-.7-.5.2-.2 1.9 1.9 9.8-7.7 35.4-18.1 48.7-7.6 9.6-14.1 12-21 7.7-7-4.3-19.5-24-23.9-37.5-2-6.3-4.6-19.7-4-20.7.3-.4 0-5.4-.6-11.1-2.6-25.7 5.1-55.3 24-92.2 4.2-8.3 8.7-16.5 9.8-18.4l2.1-3.5 8.1 16.5zM299.5 638.2c.2.7 1.4 7.8 2.7 15.8 1.9 12.3 2.2 18.8 2.3 43 .2 30.9-.7 40.1-5 55.5-6.6 23.2-20.4 43-38.8 55.2-12 8-18.9 7-24.5-3.4-3.6-6.9-7.4-20.5-7.8-28.3-.1-3-.5-10.9-.9-17.5-.9-13.5.1-21.3 4.1-33.9 6.6-20.8 19.8-40.6 42.9-64.5 14.7-15.2 24.4-23.7 25-21.9zM213.9 730.2c-5.2 12.9-6.9 17.9-5.9 17.3.6-.4 1 1.2 1 4.2 0 7.8-11.5 31.3-25.2 51.4-21.5 31.7-52.9 50.9-83.2 50.9-12.4 0-16.6-2.7-18-11.2-.1-1.1-.8-2.3-1.5-2.7-1-.7-1.1-2.7-.2-9.8 6.6-54.5 40.1-83.6 116.4-101.2 9.7-2.3 17.9-4.1 18.2-4.1.3 0-.5 2.4-1.6 5.2zM260.8 818.1c19.3 2.5 43.5 12.4 66.7 27.4 10.8 6.9 31.4 21.8 31.5 22.6 0 .4-2.8 1.6-6.3 2.9-6.6 2.4-9.2 4-6.5 4 1 0 1.9 1.2 2.3 3 1.4 6.5-4.5 10.5-22.6 15.4-57.2 15.5-98.2 9.3-127-19.4-7.5-7.4-10.1-13.1-8.1-17.4.9-2.1.6-3.1-2.9-7.7-2.1-2.9-3.9-5.5-3.9-5.8 0-.3 2.5-2.4 5.5-4.6 22.9-16.7 46.9-23.6 71.3-20.4zM31.666 854.83c4.834 1.066 12.083 6.316 13.996 10.197 1.31 2.587 1.611 4.566 1.108 8.522-.403 2.816-.604 6.392-.604 7.838.201 7.229-6.243 14.686-14.6 16.741-13.895 3.5-28.696-3.957-29.401-14.839-.1-2.13-.806-5.402-1.41-7.381-1.007-2.815-1.007-4.565 0-7.685 3.122-10.577 16.815-16.513 30.912-13.393zM138.5 860.6c27.6 4.6 58.7 22.7 93.5 54.1l5.4 5-7.4 2.3c-4.1 1.3-6.7 2.5-5.8 2.7 2.3.6 3.4 4.8 2 7.8-1.6 3.5-7.5 6.1-18.8 8.4-56.8 11.5-96.8 3.7-125-24.3-6.9-6.9-11-13-11.4-17.1-.5-4.2 0-6.6 1.2-5.9 1.2.8 1.2.7-3.9-7.3-1.8-2.9-3.3-5.6-3.3-6.2 0-1.5 4.9-4.6 14.7-9.5 20.7-10.4 38.6-13.5 58.8-10z"></path>
            </g>
            <defs>
              <clipPath id="clip0_32_70">
                <path
                  transform="rotate(180 322 473.008)"
                  d="M0 0H644V946.016H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center space-y-3">
          <a href="#" target="_blank">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=347156&amp;theme=light&amp;period=daily"
              width="250"
              height="54"
            />
          </a>
          <a href="#" target="_blank">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=347156&amp;theme=light"
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <section id="testimonies" className="py-20 ">
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
          <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
            <div className="mb-12 space-y-5 md:mb-16 md:text-center">
              <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                Words from Others
              </div>
              <h1 className="mb-5 text-3xl font-bold text-[#800000] md:text-center md:text-5xl">
                Is's not Just Us.
              </h1>
              <p className="text-xl text-gray-700 font-semibold md:text-center md:text-2xl">
                Here's what others have to say about us.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ul className="space-y-8">
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/kanyewest"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kanye West"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Kanye West
                          </h3>
                          <p className="text-gray-500 text-md">
                            Rapper &amp; Entrepreneur
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Find God.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Diam quis enim lobortis scelerisque fermentum dui
                        faucibus in ornare. Donec pretium vulputate sapien nec
                        sagittis aliquam malesuada bibendum.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/kanyewest"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kanye West"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Kanye West
                          </h3>
                          <p className="text-gray-500 text-md">
                            Rapper &amp; Entrepreneur
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Find God.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Diam quis enim lobortis scelerisque fermentum dui
                        faucibus in ornare. Donec pretium vulputate sapien nec
                        sagittis aliquam malesuada bibendum.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul className="hidden space-y-8 sm:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/paraga" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Parag Agrawal"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Parag Agrawal
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Twitter</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Enim neque volutpat ac tincidunt vitae semper. Mattis
                        aliquam faucibus purus in massa tempor. Neque vitae
                        tempus quam pellentesque nec. Turpis cursus in hac
                        habitasse platea dictumst.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Diam quis enim lobortis scelerisque fermentum dui
                        faucibus in ornare. Donec pretium vulputate sapien nec
                        sagittis aliquam malesuada bibendum.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/paraga" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Parag Agrawal"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Parag Agrawal
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Twitter</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Enim neque volutpat ac tincidunt vitae semper. Mattis
                        aliquam faucibus purus in massa tempor. Neque vitae
                        tempus quam pellentesque nec. Turpis cursus in hac
                        habitasse platea dictumst.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Diam quis enim lobortis scelerisque fermentum dui
                        faucibus in ornare. Donec pretium vulputate sapien nec
                        sagittis aliquam malesuada bibendum.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul className="hidden space-y-8 lg:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/satyanadella"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Satya Nadella"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Satya Nadella
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Microsoft</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Tortor dignissim convallis aenean et tortor at. At
                        ultrices mi tempus imperdiet nulla malesuada. Id cursus
                        metus aliquam eleifend mi. Quis ipsum suspendisse
                        ultrices gravida dictum fusce ut.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/dan_schulman"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Dan Schulman"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Dan Schulman
                          </h3>
                          <p className="text-gray-500 text-md">CEO of PayPal</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Quam pellentesque nec nam aliquam sem et tortor
                        consequat id. Enim sit amet venenatis urna cursus.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/satyanadella"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Satya Nadella"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Satya Nadella
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Microsoft</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Tortor dignissim convallis aenean et tortor at. At
                        ultrices mi tempus imperdiet nulla malesuada. Id cursus
                        metus aliquam eleifend mi. Quis ipsum suspendisse
                        ultrices gravida dictum fusce ut.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  {/* <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div> */}
                  <a
                    href="https://twitter.com/dan_schulman"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-[#EDF6FF] ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Dan Schulman"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            Dan Schulman
                          </h3>
                          <p className="text-gray-500 text-md">CEO of PayPal</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-500 font-medium text-md">
                        Quam pellentesque nec nam aliquam sem et tortor
                        consequat id. Enim sit amet venenatis urna cursus.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------------- */}
      <section
        id="faq"
        className="container relative max-w-5xl mx-auto py-12 px-2"
      >
        <h3 className="mb-14 text-teal-900 text-center text-3xl font-semibold underline decoration-teal-200/80 lg:text-left xl:text-4xl">
          Frequently Asked Questions
        </h3>

        {faqs.map((faq, index) => (
          <div key={index} className=" ">
            <div
              className="rounded-t-2xl mt-4 bg-[#800000] w-full cursor-pointer select-none border-2 border-teal-600/30 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white"
              onClick={() => toggleAnswer(index)}
            >
              <h4 className="text-lg font-medium">{faq.question}</h4>
            </div>

            <div
              className={`inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800 transition-all duration-300 ease-in-out ${
                expandedIndex === index
                  ? "block"
                  : "hidden"
              } overflow-hidden`}
            >
              <h5>{faq.answer}</h5>
            </div>
          </div>
        ))}
      </section>

      {/* ------------------------------------------------------------------- */}
      <div className="mt-8 bg-[#fff6ea] pt-9">
        <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
          <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
            <div className="md:w-[316px]">
              <p className="text-[18px] font-medium text-gray-700">
                <img alt="logo" src={require("../assets/a/logo.png")} />
              </p>
              <p className="mt-[18px] text-[15px] font-normal text-gray-700/[80%]">
                Our mission is to help individuals navigate their life's journey
                with wisdom, insight, and clarity through astrology. Whether you
                are facing a difficult decision or simply seeking answers,
                Grahsalah is your trusted source for accurate and meaningful
                astrological guidance.
              </p>
              <div className="mt-[18px] flex gap-4">
                <a className="hover:scale-110" target="_blank" href="#">
                  <FaInstagram width="36" height="36" />
                </a>
                <a className="hover:scale-110" target="_blank" href="/">
                  <FaInstagram width="36" height="36" />
                </a>
                <a className="hover:scale-110" target="_blank" href="/">
                  <FaFacebook width="36" height="36" />
                </a>
                <a className="hover:scale-110" target="_blank" href="">
                  <FaFacebook width="36" height="36" />
                </a>
                <a
                  className="hover:scale-110"
                  target="_blank"
                  href="https://www.youtube.com/"
                >
                  <FaFacebook width="36" height="36" />
                </a>
              </div>
            </div>
            <div className="md:w-[316px]">
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8472 14.8554L16.4306 12.8764L16.4184 12.8707C16.1892 12.7727 15.939 12.7333 15.6907 12.7562C15.4424 12.7792 15.2037 12.8636 14.9963 13.002C14.9718 13.0181 14.9484 13.0357 14.9259 13.0545L12.6441 14.9998C11.1984 14.2976 9.70595 12.8164 9.00376 11.3895L10.9519 9.07294C10.9706 9.0495 10.9884 9.02606 11.0053 9.00075C11.1407 8.79384 11.2229 8.55667 11.2445 8.31035C11.2661 8.06402 11.2264 7.81618 11.1291 7.58887V7.57762L9.14438 3.15356C9.0157 2.85662 8.79444 2.60926 8.51362 2.44841C8.2328 2.28756 7.9075 2.22184 7.58626 2.26106C6.31592 2.42822 5.14986 3.05209 4.30588 4.01615C3.4619 4.98021 2.99771 6.21852 3.00001 7.49981C3.00001 14.9436 9.05626 20.9998 16.5 20.9998C17.7813 21.0021 19.0196 20.5379 19.9837 19.6939C20.9477 18.85 21.5716 17.6839 21.7388 16.4136C21.7781 16.0924 21.7125 15.7672 21.5518 15.4864C21.3911 15.2056 21.144 14.9843 20.8472 14.8554ZM16.5 19.4998C13.3185 19.4963 10.2682 18.2309 8.01856 15.9813C5.76888 13.7316 4.50348 10.6813 4.50001 7.49981C4.49648 6.58433 4.82631 5.69887 5.42789 5.00879C6.02947 4.3187 6.86167 3.87118 7.76907 3.74981C7.7687 3.75355 7.7687 3.75732 7.76907 3.76106L9.73782 8.16731L7.80001 10.4867C7.78034 10.5093 7.76247 10.5335 7.74657 10.5589C7.60549 10.7754 7.52273 11.0246 7.5063 11.2825C7.48988 11.5404 7.54035 11.7981 7.65282 12.0307C8.5022 13.7679 10.2525 15.5051 12.0084 16.3536C12.2428 16.465 12.502 16.5137 12.7608 16.495C13.0196 16.4762 13.2692 16.3907 13.485 16.2467C13.5091 16.2305 13.5322 16.2129 13.5544 16.1942L15.8334 14.2498L20.2397 16.2232C20.2397 16.2232 20.2472 16.2232 20.25 16.2232C20.1301 17.1319 19.6833 17.9658 18.9931 18.5689C18.3028 19.172 17.4166 19.5029 16.5 19.4998Z"
                      fill="black"
                    ></path>
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <a
                    href="tel:+911800123444"
                    className="font-Inter text-[14px] font-medium text-gray-700"
                  >
                    +91 1800123444
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-gray-700">
                    Support Number
                  </p>
                </div>
              </div>
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <svg
                    width="20"
                    height="15"
                    viewBox="0 0 20 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 0H1C0.801088 0 0.610322 0.0790178 0.46967 0.21967C0.329018 0.360322 0.25 0.551088 0.25 0.75V13.5C0.25 13.8978 0.408035 14.2794 0.68934 14.5607C0.970644 14.842 1.35218 15 1.75 15H18.25C18.6478 15 19.0294 14.842 19.3107 14.5607C19.592 14.2794 19.75 13.8978 19.75 13.5V0.75C19.75 0.551088 19.671 0.360322 19.5303 0.21967C19.3897 0.0790178 19.1989 0 19 0ZM10 7.98281L2.92844 1.5H17.0716L10 7.98281ZM7.25406 7.5L1.75 12.5447V2.45531L7.25406 7.5ZM8.36406 8.51719L9.48906 9.55312C9.62743 9.68014 9.80842 9.75062 9.99625 9.75062C10.1841 9.75062 10.3651 9.68014 10.5034 9.55312L11.6284 8.51719L17.0659 13.5H2.92844L8.36406 8.51719ZM12.7459 7.5L18.25 2.45438V12.5456L12.7459 7.5Z"
                      fill="black"
                    ></path>
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <a
                    href="mailto:help@lorem.com"
                    className="font-Inter text-[14px] font-medium text-gray-700"
                  >
                    help@lorem.com
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-gray-700">
                    Support Email
                  </p>
                </div>
              </div>
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 4.5C8.25832 4.5 7.5333 4.71993 6.91661 5.13199C6.29993 5.54404 5.81928 6.12971 5.53545 6.81494C5.25162 7.50016 5.17736 8.25416 5.32205 8.98159C5.46675 9.70902 5.8239 10.3772 6.34835 10.9017C6.8728 11.4261 7.54098 11.7833 8.26841 11.9279C8.99584 12.0726 9.74984 11.9984 10.4351 11.7145C11.1203 11.4307 11.706 10.9501 12.118 10.3334C12.5301 9.7167 12.75 8.99168 12.75 8.25C12.75 7.25544 12.3549 6.30161 11.6517 5.59835C10.9484 4.89509 9.99456 4.5 9 4.5ZM9 10.5C8.55499 10.5 8.11998 10.368 7.74997 10.1208C7.37996 9.87357 7.09157 9.52217 6.92127 9.11104C6.75097 8.6999 6.70642 8.2475 6.79323 7.81105C6.88005 7.37459 7.09434 6.97368 7.40901 6.65901C7.72368 6.34434 8.12459 6.13005 8.56105 6.04323C8.9975 5.95642 9.4499 6.00097 9.86104 6.17127C10.2722 6.34157 10.6236 6.62996 10.8708 6.99997C11.118 7.36998 11.25 7.80499 11.25 8.25C11.25 8.84674 11.0129 9.41903 10.591 9.84099C10.169 10.2629 9.59674 10.5 9 10.5ZM9 0C6.81273 0.00248131 4.71575 0.872472 3.16911 2.41911C1.62247 3.96575 0.752481 6.06273 0.75 8.25C0.75 11.1938 2.11031 14.3138 4.6875 17.2734C5.84552 18.6108 7.14886 19.8151 8.57344 20.8641C8.69954 20.9524 8.84978 20.9998 9.00375 20.9998C9.15772 20.9998 9.30796 20.9524 9.43406 20.8641C10.856 19.8147 12.1568 18.6104 13.3125 17.2734C15.8859 14.3138 17.25 11.1938 17.25 8.25C17.2475 6.06273 16.3775 3.96575 14.8309 2.41911C13.2843 0.872472 11.1873 0.00248131 9 0ZM9 19.3125C7.45031 18.0938 2.25 13.6172 2.25 8.25C2.25 6.45979 2.96116 4.7429 4.22703 3.47703C5.4929 2.21116 7.20979 1.5 9 1.5C10.7902 1.5 12.5071 2.21116 13.773 3.47703C15.0388 4.7429 15.75 6.45979 15.75 8.25C15.75 13.6153 10.5497 18.0938 9 19.3125Z"
                      fill="black"
                    ></path>
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <a
                    href="mailto:help@lorem.com"
                    className="font-Inter text-[14px] font-medium text-gray-700"
                  >
                    Sub Nerul, Mumbia, India, 123456
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-gray-700">
                    Address
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col justify-between text-gray-700 sm:flex-row md:mt-0 md:max-w-[341px]">
              <div className="">
                <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal">
                  Pages
                </p>
                <ul>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/our-tutors"
                    >
                      News
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/become-a-tutor"
                    >
                      Contact
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/plans-and-pricing"
                    >
                      Plans and pricing
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/terms-and-conditions"
                    >
                      Terms and conditions
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                      href="/privacy-policy"
                    >
                      Privcay policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                <p className="text-deutziawhite font-inter text-[18px] font-medium">
                  Download the app
                </p>
                <div className="flex gap-4 sm:flex-col">
                  <a target="_blank" href="#">
                    <img
                      alt="facebook icon"
                      loading="lazy"
                      width="168"
                      height="50"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="https://www.englishyaari.com/img/google-store.svg"
                    />
                  </a>
                  <a target="_blank" href="#">
                    <img
                      alt="facebook icon"
                      loading="lazy"
                      width="168"
                      height="50"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="https://www.englishyaari.com/img/apple-store.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-[30px] text-gray-700" />
          <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
            <p className="text-[10px] font-normal text-gray-700 md:text-[12px]">
              © Copyright 2024 , All Rights Reserved by YOUR WEBSITES. PVT. LTD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const plants = [
  {
    name: "माणिक्य (Ruby)",
    price: "$36.00",
    type: "Indoor",
    image: require("../assets/a/img7.png"),
    background: "bg-orange-500",
    textColor: "text-orange-500",
  },
  {
    name: "पन्ना (Emerald)",
    price: "$45.00",
    type: "Outdoor",
    image: require("../assets/a/img7.png"),
    background: "bg-teal-500",
    textColor: "text-teal-500",
  },
  {
    name: "मोती (Pearl)",
    price: "$68.50",
    type: "Outdoor",
    image: require("../assets/a/img7.png"),
    background: "bg-purple-500",
    textColor: "text-purple-500",
  },
  {
    name: "सूर्यकांत (Ruby)",
    price: "$68.50",
    type: "Outdoor",
    image: require("../assets/a/img7.png"),
    background: "bg-purple-500",
    textColor: "text-purple-500",
  },
];

const cards9 = [
  {
    id: 1,
    img: require("../assets/a/1.png"),
    title: "Kundli",
  },
  {
    id: 2,
    img: require("../assets/a/2.png"),
    title: "Horoscope Matching",
  },
  {
    id: 3,
    img: require("../assets/a/3.png"),
    title: "Horoscope",
  },
  {
    id: 4,
    img: require("../assets/a/4.webp"),
    title: "Love & relationship",
  },
  {
    id: 5,
    img: require("../assets/a/5.png"),
    title: "Marriage & Kundli",
  },
  {
    id: 5,
    img: require("../assets/a/9.png"),
    title: "Panchang",
  },
  {
    id: 7,
    img: require("../assets/a/3.png"),
    title: "Personal Horoscope",
  },

  {
    id: 6,
    img: require("../assets/a/6.png"),
    title: "Chat With Astrologer",
  },
  {
    id: 8,
    img: require("../assets/a/8.png"),
    title: "Ask A Question",
  },
];

const faqs = [
  {
    question: "How do I create an account on the website?",
    answer: (
      <>
        To create an account, click on the "Sign Up" button located at the top
        right corner of the homepage.
        <br />
        Fill out the required information, including your name, email address,
        and password.
        <br />
        Click "Create Account" to complete the registration process.
      </>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer: (
      <>
        We accept several payment methods for your convenience, including credit
        cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.
      </>
    ),
  },
  {
    question: "How long does shipping take?",
    answer: (
      <>
        Shipping times may vary depending on your location and the product you
        ordered.
        <br />
        We strive to process and ship orders within 1-2 business days after
        payment confirmation.
      </>
    ),
  },
];

// <div className="bg-black py-32">
// <div className="flex flex-col justify-center items-center">
//   <div className="flex items-center justify-center rounded-full border border-zinc-600 px-2 py-[6px]">
//     <div className="w-5 h-5 bg-zinc-900 rounded-full text-zinc-400 mr-2 p-[4px]">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M19 32c-7.732 0-14-6.268-14-14S11.268 4 19 4s14 6.268 14 14"></path><path d="M44 18H18v26h26z"></path></g></svg>
//       </div>
//       <div className="text-zinc-400 text-sm">
//         Why choose Augment?
//       </div>
//     </div>
//     <div className="relative text-center mt-5 mb-12 text-5xl font-medium">
//       <h1 className="relative text-white pb-3 leading-[65px] z-10 isolate">We Create The Best Customer<br>Experience For You</h1>
//         <div className="absolute left-1/2 bottom-12 -translate-x-1/2 h-12 w-96 bg-blue-800 blur-[50px] z-[1] opacity-60">
//         </div>
//       </div>
//     </div>
// </div>
