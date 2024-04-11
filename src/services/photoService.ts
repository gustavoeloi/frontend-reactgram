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

const photoService = {
  publishPhoto,
};

export default photoService;
