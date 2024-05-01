import CryptoJS from "crypto-js";

export const encryptData = (data: any): string => {
  const hash = CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
  return hash;
};