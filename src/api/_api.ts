import axios from "axios";

import Storage from "@utils/storage";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = Storage.get("trivia-access-token");

  if (token) {
    if (!config.headers) config.headers = {};
    config.headers.authorization = token;
  }
});

export default api;
