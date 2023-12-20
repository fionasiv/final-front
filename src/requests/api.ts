import axios from "axios";
// import { API_CONNECTION_URL } from '../consts/AppConsts';

export const API_CONNECTION_URL = "http://localhost:3000";

export default axios.create({
  baseURL: `${API_CONNECTION_URL}`,
});
