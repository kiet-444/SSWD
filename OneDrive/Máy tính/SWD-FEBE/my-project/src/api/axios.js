import axios from "axios";

const baseURL = `https://baitapdeploy-production.up.railway.app/`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
