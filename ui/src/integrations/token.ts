import jwtDecode from "jwt-decode";

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.accessToken;
};
console.log(getAccessToken)
const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.refreshToken;
};
console.log(getRefreshToken)
const getJWT = (): any => jwtDecode(getAccessToken());

const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
console.log(getJWT)
const removeUser = () => {
  localStorage.removeItem("user");
};

const isTokenExpired = (token: any) => {
  const jwt = jwtDecode(token) as any;
  const currentTime = new Date().getTime() / 1000;
  return currentTime > jwt.exp;
};

const TokenUtils = {
    getUser,
  getAccessToken,
  getRefreshToken,
  getJWT,
  setUser,
  removeUser,
  isTokenExpired
};

export default TokenUtils;