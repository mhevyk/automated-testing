import { API } from "./base";

export const signIn = ({ email, password }) => {
  return API.post("users/login", { json: { email, password } }).json();
};

export const getMe = () => {
  return API.get("users/me").json();
};

export const updateUser = (overrideUser) => {
  return API.patch("users/me", { json: overrideUser }).json();
};

export const logout = () => {
  return API.post("users/logout").json();
};
