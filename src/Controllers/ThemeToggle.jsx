import React, { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { GiMoon } from "react-icons/gi";

const ThemeToggle = ({ onNav }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    sessionStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div>
      <button onClick={handleClick} className={onNav ? "hidden" : ""}>
        {darkMode ? (
          <p className="flex items-center gap-4">
            Switch To Light <IoSunny size={16} color="white" />
          </p>
        ) : (
          <p className="flex items-center gap-4">
            Switch To Dark <MdDarkMode size={16} />
          </p>
        )}
      </button>

      {/* on nav bar */}
      <button onClick={handleClick} className={onNav ? "flex" : "hidden "}>
        {darkMode ? (
          <p className="flex items-center gap-4">
            <IoSunny size={26} color="white" />
          </p>
        ) : (
          <p className="flex items-center gap-4">
            <GiMoon size={26} color="white" />
          </p>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
