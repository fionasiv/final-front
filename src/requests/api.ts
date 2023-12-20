import axios from "axios";

export const API_CONNECTION_URL = "http://localhost:3000";

export default axios.create({
  baseURL: `${API_CONNECTION_URL}`,
});
