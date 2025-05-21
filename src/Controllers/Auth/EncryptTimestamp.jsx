import React from "react";
import CryptoJS from "crypto-js";

export const EncryptTimestamp = async () => {
  const timestamp = Date.now().toString(); 
  const secretKey = process.env.REACT_APP_WALLET_UPDATE_KEY 

  const secret = CryptoJS.AES.encrypt(
    timestamp,
    secretKey
  ).toString();

  return { secret, timestamp }; 
};