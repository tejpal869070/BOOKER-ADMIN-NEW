import { useState, useEffect } from "react";
import { CheckToken } from "./AuthController";
import { Loading1, Loading3 } from "../../Componentes/Loading1";

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const username = sessionStorage.getItem("mobile");
      const token = sessionStorage.getItem("token");

      if (!token || !username) {
        // Redirect to login page without a full page reload
        return (window.location.href = "/login");
      }

      try {
        await CheckToken(); 
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        // Redirect to login page on error without a full page reload
        return (window.location.href = "/login");
      }
    };

    checkToken();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="w-screen h-screen flex justify-center items-center m-auto ">
        <Loading3 />
      </div>
    );
  }

  return children;
};
