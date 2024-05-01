const CryptoJS = require('crypto-js')

const secretKey = "e4po4mack";

const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encrypted;
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

module.exports = {
    encryptData,
    decryptData
}