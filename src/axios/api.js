import axios from "axios";

export const loginInstance = axios.create({
  baseURL: process.env.REACT_APP_LOGININSTANCE,
});

export const letterInstance = axios.create({
  baseURL: process.env.REACT_APP_LETTERINSTANCE,
});
