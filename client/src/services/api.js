import axios from "axios";

export const api = axios.create({
  baseURL: "api",
});

export function apiWithToken(token) {
  return axios.create({
    baseURL: "api",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
