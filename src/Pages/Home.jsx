import React, { useState } from "react";
import { Link } from "react-router-dom";
import InnerSection from "./userPages/InnerSection";
import { IoHome } from "react-icons/io5";

export default function Home() {
  const sidebarItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Users", to: "/dashboard", search: "?admin=users" },
    { label: "Deposits", to: "/dashboard", search: "?admin=deposit" },
    { label: "Withdrawals", to: "/dashboard", search: "?admin=withdrawal" },
    { label: "Games", to: "/dashboard", search: "?admin=games-control" },
    { label: "Match", to: "/dashboard", search: "?admin=matches" },
    { label: "Quiz", to: "/dashboard", search: "?admin=quiz" },
  ];
  return (
    <div>
      <nav class="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <Link
                to={"/dashboard"}
                class="flex gap-2 items-center ms-2 md:me-24"
              >
                <IoHome size={22} color="white" />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  SneakBooker
                </span>
              </Link>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="userd"
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-900 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-900 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={
                    item.search
                      ? { pathname: item.to, search: item.search }
                      : item.to
                  }
                  className="flex items-center p-2 text-gray-100 rounded-full hover:justify-center  hover:bg-gray-100 hover:text-gray-700 group  shadow-lg bg-gray-800"
                >
                  <svg
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem("mobile");
                  sessionStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-100 hover:text-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 pt-[70px] min-h-screen bg-gray-700">
        <InnerSection />
      </div>
    </div>
  );
}
