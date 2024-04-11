import { User } from "@/utils/interfaces";
import { api, requestConfig } from "./../utils/config";

const profile = async (data: User, token: string) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(`${api}/users/profile`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async (data: User, token: string) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(`${api}/users/`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getUserDetails = async (id: string) => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (err) {
    console.log(err);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
