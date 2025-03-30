import "dotenv/config";
import ky from "ky";

export const API = ky.create({
  prefixUrl: process.env.API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
