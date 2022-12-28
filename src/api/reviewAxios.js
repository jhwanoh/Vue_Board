import axios from "axios";

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options));
  return instance;
}

export const reviews = create("http://localhost:8080/review");
