import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/authPages/Login";
import Register from "./Pages/authPages/Register";
import OtpVerify from "./Pages/authPages/OtpVerify";
import Home from "./Pages/Home";
import PreLoad from "./Pages/PreLoad";
import { ProtectedRoute } from "./Controllers/Auth/ProtectedRoute";
import ChangePassword from "./Pages/authPages/ChangePassword";
import ForgetPassword from "./Pages/authPages/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
