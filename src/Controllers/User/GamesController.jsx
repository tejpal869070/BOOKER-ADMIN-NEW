import axios from "axios";
import { API } from "../Api";
import CryptoJS from "crypto-js";

var EncodedMobile = btoa(JSON.stringify(sessionStorage.getItem("mobile")));
var mobile = sessionStorage.getItem("mobile");
var bearerToken = sessionStorage.getItem("token");

export const DecodeString = async (str) => {
  const decodedurl = atob(str);
  return JSON.parse(decodedurl);
};

export const EncodeString = async (str) => {
  const encodedurl = btoa(JSON.stringify(str));
  return encodedurl;
};

export const GetGameTypes = async () => {
  try {
    const postData = {
      data: EncodedMobile,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${API.colorGameUrl}/get-game-type`,
      postData,
      axiosConfig
    );
    const decodedData = await DecodeString(response?.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const ColorGameNumbers = async (id) => {
  try {
    const data = await EncodeString({ mobile, id });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}get-game-mapping-number`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const ColorGameColors = async (id) => {
  try {
    const data = await EncodeString({ mobile, id });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}get-game-mapping-color`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const ColorGameCurrentData = async (id) => {
  try {
    const data = await EncodeString({ mobile, id });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}get-record-not-complete`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const ColorGameAllResult = async (id) => {
  try {
    let page = 1;
    const data = await EncodeString({ mobile, id, page });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}get-record-complete`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const MyColorGameHistory = async (id, page) => {
  try {
    const data = await EncodeString({ mobile, id, page });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}get-bet-record`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const AddNewColorGameBet = async (formData) => {
  const select = formData.select;
  const color = formData.color;
  const period = formData.period;
  const method = formData.method;
  const game_type = formData.game_type;
  const id = formData.id;
  const total_amount = formData.total_amount;
  const bonuscheck = false;
  try {
    const data = await EncodeString({
      select,
      color,
      period,
      method,
      game_type,
      id,
      total_amount,
      mobile,
      bonuscheck,
    });
    const postData = {
      data: data,
    };
    const response = await axios.post(
      `${API.colorGameUrl}add-bet-details`,
      postData
    );
    const decodedData = await DecodeString(response.data);
    return decodedData;
  } catch (error) {
    throw error;
  }
};

export const MainGameWalletMoneyTransfer = async (formData, pin) => {
  try {
    const postData = {
      mobile: mobile,
      pin: pin,
      amount: formData.amount,
      type: formData.type,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${API.url}user/color-money-transfer`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const MinesGameUpdateWallet = async (formData) => {
  try {
    const amount = formData.amount;
    const type = formData.type;
    const game_type = formData.game_type;
    const uid = formData.uid;
    const details = formData.details || {};
    const timestampResponse = await GetServerCurrentTime();
    const date = timestampResponse;
    const timestamp = new Date(date).getTime();

    const data = {
      amount,
      type,
      game_type,
      uid,
      timestamp,
      details,
    };

    const secretKey = process.env.REACT_APP_WALLET_UPDATE_KEY;

    const encodedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    const postData = {
      mobile: mobile,
      data: encodedData,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await axios.post(
      `${API.url}user/add-balance-update`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetServerCurrentTime = async () => {
  try {
    const response = await axios.post(`${API.url}user/get-current-time `);
    if (response.data.status) {
      return response?.data?.current_time;
    }
  } catch (error) {
    throw error;
  }
};

export const GetGameHistoryByType = async (type) => {
  try {
    const postData = {
      mobile: mobile,
      type: type,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.post(
      `${API.url}user/get-game-statement `,
      postData,
      axiosConfig
    );
    if (response.data.status) {
      return response?.data?.data;
    }
  } catch (error) {
    return [];
  }
};



export const getAllGames = async () => {
  const response = await axios.post(`${API.url}/admin/get-games `);
  return response;
};


 