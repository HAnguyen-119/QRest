import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const axiosClient = axios.create({
  baseURL: "http://34.87.113.245:18080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },

});

// Interceptors
// Add a request interceptor

axiosClient.interceptors.request.use(
  async function(config) {
    try {
      const isLogin = await AsyncStorage.getItem("isLogin");
      const token = await AsyncStorage.getItem("token");

      if (isLogin === "true" && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error accessing AsyncStorage", error);
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


// Add a response interceptor
axiosClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response: ' ,response)
    console.log('response.data: ' ,response.data)
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
