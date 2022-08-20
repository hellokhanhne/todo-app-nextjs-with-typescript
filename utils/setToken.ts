import axiosClient from "../api/axiosClient";

export const setToken = (token: string | null) => {
  if (token) {
    return (axiosClient.defaults.headers.common["Authorization"] =
      "Bearer " + token);
  }
  delete axiosClient.defaults.headers.common["Authorization"];
};
