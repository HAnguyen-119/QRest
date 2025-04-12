import axios from "axios";

const axiosClient = axios.create({
<<<<<<< Updated upstream
  baseURL: "http://localhost:8080", // todo: need change
=======
  // baseURL: "http://10.0.2.2:8080/api/v1/",
  baseURL: "http://localhost:8080/api/v1/",
>>>>>>> Stashed changes
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
// Add a request interceptor

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (sessionStorage.getItem("isLogin") === "true") {
      const token = sessionStorage.getItem("token");
      if (token !== null && token !== undefined && token !== "undefined") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;