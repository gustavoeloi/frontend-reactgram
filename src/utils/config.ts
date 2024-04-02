type HttpMethod = "GET" | "POST" | "PUST" | "DELETE";
type RequestData = Record<string, any> | null;
type Token = string | null;
type ImageData = FormData | null;

interface RequestConfig {
  method: HttpMethod;
  body?: string | FormData;
  headers: Record<string, string>;
}

export const api = "http://localhost:5000/api";
export const upload = "http://localhost:5000/uploados";

export const requestConfig = (
  method,
  data,
  token = null,
  image = null
): RequestConfig => {
  let config: RequestConfig;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return config;
};
