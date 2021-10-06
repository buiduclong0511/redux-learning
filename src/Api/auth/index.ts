import axiosClient from "src/Api/axiosClient";

import { ILogin, IRegister } from "src/Interface";

export const authApi = {
  login(body: ILogin) {
    const url = "/api/users/login";

    return axiosClient.post(url, body);
  },
  register(body: IRegister) {
    const url = "/api/users/register";

    return axiosClient.post(url, body);
  },
};
