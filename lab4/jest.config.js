export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!ky/)", // Ignore all `node_modules` except for `ky`
  ],
  setupFiles: ["jest-localstorage-mock"],
};
