// api/auth.ts
import axios from "axios";
import {
  LoginFormDTO,
  LoginResponseDTO,
  RegisterFormDTO,
  RegisterResponseDTO,
  User,
} from "./dto/auth.dto";
import Cookies from "js-cookie";

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await axios.post("http://localhost:7777/auth/login", values)).data;
};

export const register = async (
  values: RegisterFormDTO
): Promise<RegisterResponseDTO> => {
  return (await axios.post("http://localhost:7777/auth/register", values)).data;
};

// export const getMe = async (): Promise<User> => {
//   return (await axios.get("/users")).data; // Changed from /users/me to /users
// };

export const logout = () => {
  Cookies.remove("_token", { path: "/" });
};
