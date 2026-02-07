import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "cafe_admin_token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return true;
    }
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};
