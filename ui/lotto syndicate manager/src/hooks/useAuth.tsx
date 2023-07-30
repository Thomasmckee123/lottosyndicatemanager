// import { useMutation } from "react-query";
// import { axiosInstance } from "../integrations/instance";
// interface IAuthBody {
//   email: string;
//   password: string;
// }

// export const fetchAccessTokens = async (users: IAuthBody) => {
//   try {
//     const response = await axiosInstance.post("/api/authenticate", users);
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// const useAuth = () =>
//   useMutation((checkUserAuth: IAuthBody) => fetchAccessTokens(checkUserAuth));

// export default useAuth;
