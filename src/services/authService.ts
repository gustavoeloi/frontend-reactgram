import { requestConfig, api } from "./../utils/config";

import { LoginData, RegisterData } from "@/utils/interfaces";

// Register User
const register = async (data: RegisterData) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  localStorage.removeItem("user");
};

const login = async (data: LoginData) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/login`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
