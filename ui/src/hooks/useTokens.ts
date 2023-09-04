import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";
import { useState } from "react";
import { NavigationRoutes } from "../constants";
import instance, { setBearerToken } from "../integrations/instance";
interface IClaims {
  userId: number;
  image: string;
  email: string;
  balance: number;
}
interface IAccessToken {
  iat: number;
  exp: number;
  sub: number;
  claims: IClaims;
}
interface IUseTokens {
  checkIfValidToken: (tokens: any) => Promise<void>;
  checkLocalStorageTokens: () => void;
  clearLocalStorageTokens: () => void;
}

const useTokens = (): IUseTokens => {
  const { setIsAuthorized } = AuthContext.useLogin();
  const navigate = useNavigate();

  const checkIfValidToken = async (tokens: any) => {
    const decodedAccess = jwt_decode<IAccessToken>(tokens.accessToken);
    const decodedRefresh = jwt_decode<IAccessToken>(tokens.refreshToken);

    const accessTokenDate = new Date(decodedAccess.exp * 1000);
    const refreshTokenDate = new Date(decodedRefresh.exp * 1000);
    const nowDate = new Date();

    if (accessTokenDate > nowDate) {
      const authDetails = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
      localStorage.setItem("user", JSON.stringify(authDetails));
      console.log("setting bearer token", tokens.accessToken);
      setBearerToken(tokens.accessToken);
      console.log("setting is auth true");
      setIsAuthorized(true);
    }
    if (accessTokenDate < nowDate && refreshTokenDate > nowDate) {
      const config = {
        headers: { Authorization: `Bearer ${tokens.refreshToken}` },
      };

      const resp = await instance.get("/authenticate/refresh", config);

      const authDetails = {
        accessToken: resp.data.accessToken,
        refreshToken: resp.data.refreshToken,
      };
      localStorage.setItem("user", JSON.stringify(authDetails));
      setBearerToken(authDetails.accessToken);
      setIsAuthorized(true);
    }
    if (accessTokenDate < nowDate && refreshTokenDate < nowDate) {
      setIsAuthorized(false);
    }
  };

  const checkLocalStorageTokens = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const localStorageAccess = user?.accessToken;
    const localStorageRefresh = user?.refreshToken;
    if (localStorageAccess || localStorageRefresh) {
      checkIfValidToken({
        accessToken: localStorageAccess,
        refreshToken: localStorageRefresh,
      });
    } else {
      setIsAuthorized(false);
    }
  };

  const clearLocalStorageTokens = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    setIsAuthorized(false);
    navigate(0);
  };

  return {
    checkIfValidToken,
    checkLocalStorageTokens,
    clearLocalStorageTokens,
  };
};

export default useTokens;
