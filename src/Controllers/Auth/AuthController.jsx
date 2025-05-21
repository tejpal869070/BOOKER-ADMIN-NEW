import axios from "axios";
import { API } from "../Api";

var mobile = sessionStorage.getItem("mobile");
var bearerToken = sessionStorage.getItem("token");

export const CheckUserExistance = async (formData) => {
  try {
    const postData = {
      mobile: formData.mobile,
      email: formData.email,
      reffer_by: formData.reffer_by,
      position: formData.position || "L",
    };

    const response = await axios.post(
      `${API.url}user/check-user-existence`,
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegistration = async (formData) => {
  try {
    const postData = {
      name: formData.name,
      mobile: formData.mobile,
      password: formData.password,
      email: formData.email,
      reffer_by: formData.reffer_by,
      position: formData.position,
      token: formData.token,
    };

    const response = await axios.post(`${API.url}user/register`, postData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userLogin = async (userData) => {
  const postData = {
    username: userData.username,
    password: userData.password,
  };

  const response = await axios.post(`${API.url}/admin/login`, postData);
  return response.data;
};

export const SendOtp = async (formData) => {
  try {
    const dataToSend = {
      email: formData.email,
    };
    const response = await axios.post(`${API.url}user/get-otp`, dataToSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckToken = async () => {
  const bearerToken = sessionStorage.getItem("token");
  const postData = {
    username: sessionStorage.getItem("mobile"),
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const response = await axios.post(
    `${API.url}/admin/token-check`,
    postData,
    axiosConfig
  );
  return response;
};

export const VerifyOtp = async (formData) => {
  try {
    const postData = {
      email: formData.email,
      otp: formData.otp,
    };

    const response = await axios.post(`${API.url}user/verify-otp`, postData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ForgetPasswordApi = async (formData) => {
  try {
    const dataToSent = {
      email: formData.email,
      password: formData.password,
      token: formData.token,
    };

    const response = await axios.post(
      `${API.url}user/forget-password`,
      dataToSent
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserNameByMobile = async (mobile) => {
  try {
    const dataToSent = {
      user_mobile: mobile,
    };

    const response = await axios.post(`${API.url}user/check-user`, dataToSent);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SendMoneyToUser = async (formData, pin) => {
  try {
    const dataToSent = {
      pin: pin,
      mobile: mobile,
      amount: formData.amount,
      user_mobile: formData.userMobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${API.url}user/money-transfer`,
      dataToSent,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PinVerification = async (pin) => {
  try {
    const dataToSent = {
      pin: pin,
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${API.url}user/verify-pin`,
      dataToSent,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ChangeSecurityPin = async (formData) => {
  try {
    const dataToSent = {
      pin: formData.pin,
      email: formData.email,
      token: formData.token,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${API.url}user/change-pin`,
      dataToSent,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
