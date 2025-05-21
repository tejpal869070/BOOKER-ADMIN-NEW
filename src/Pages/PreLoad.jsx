import React, { useEffect } from "react";
import bg1 from "../assets/photos/stadium2.jpg";
import gif1 from "../assets/photos/logo (1).gif";
import { useNavigate } from "react-router-dom";

export default function PreLoad() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 4000);
  }, [navigate]);

  return (
    <div>
      <div
        className="h-screen w-screen bg-cover bg-no-repeat bg-fixed overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg1})`,
        }}
      >
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="rounded-full p-6 backdrop-blur-md bg-white/30">
            <img alt="gif" src={gif1} className="w-80 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
