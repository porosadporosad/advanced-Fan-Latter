import axios from "axios";

export const loginInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export const letterInstance = axios.create({
  baseURL: "http://localhost:5000",
});
