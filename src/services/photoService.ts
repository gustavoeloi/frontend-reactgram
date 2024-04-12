import { api, requestConfig } from "@/utils/config";

const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(`${api}/photos/`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (err) {
    console.log(err);
  }
};

const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token, false);

  try {
    const res = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (err) {
    console.log(err);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
};

export default photoService;
