import React, { createContext, useReducer } from "react";

interface AuthContextProps {
  state: {
    accessToken: string;
    refreshToken: string;
  };
  dispatch: React.Dispatch<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "authentication": {
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case "logout": {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }: any) {
  const auth = localStorage.getItem("user");
  let parsedAuth;

  try {
    parsedAuth = auth ? JSON.parse(auth) : {};
  } catch (error) {
    console.error("Failed to parse user data from local storage", error);
    parsedAuth = {};
  }

  const [state, dispatch] = useReducer(authReducer, parsedAuth);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useLogin() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within an Auth Provider");
  }
  return context;
}

export default { AuthProvider, useLogin };
