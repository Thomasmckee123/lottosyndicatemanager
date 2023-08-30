import instance from "../integrations/instance";

const authenticate = async (emailAddress: string, password: string) => {
    return await instance
      .post("/authenticate", { emailAddress, password })
      .then((response) => {
        return response;
      });
  };
 
const refresh = async () => {
    return await instance
      .post("/authenticate/refresh")
      .then((response) => {
        return response;
      });
  };

const AuthService = {
  authenticate: authenticate,
  refresh: refresh
}

export default AuthService;