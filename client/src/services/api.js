import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
});

export function apiWithToken(token) {
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
}
