import { API } from "./base";

export const getAll = () => {
  return API.get("contacts").json();
};

export const getById = (id) => {
  return API.get(`contacts/${id}`).json();
};

export const create = (contact) => {
  return API.post("contacts", { json: contact }).json();
};

export const updateById = (id, overrideContact) => {
  return API.patch(`contacts/${id}`, { json: overrideContact }).json();
};

export const deleteById = (id) => {
  return API.delete(`contacts/${id}`).text();
};
