import { jwtDecode } from "jwt-decode";

export const decodedToken = (
  token: string
): {
  id: string;
  email: string;
  role: string;
} => {
  return jwtDecode(token);
};
