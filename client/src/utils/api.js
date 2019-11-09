import axios from "axios";

export function getToken () {
   return localStorage.getItem("user-token");
};
export function setToken (token) {
   localStorage.setItem("user-token", token);
};
export function clearToken () {
   localStorage.removeItem("user-token");
}

export default function axiosWithAuth () {
   return axios.create({
      baseURL: "http://localhost:5000",
      headers: {
         Authorization: getToken()
      }
   });
}