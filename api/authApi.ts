import axiosClient from "./axiosClient";

const authApi = {
  login(data: any) {
    return axiosClient.post("/user/login", data);
  },
  register(data: any) {
    return axiosClient.post("/user/register", data);
  },
  loadUser() {
    return axiosClient.get("/user/me");
  },
};

export default authApi;
