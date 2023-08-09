import instance from "../integrations/instance";

const authenticate = async (email_address: string, password: string) => {
    return await instance
      .post("/authenticate", { email_address, password })
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