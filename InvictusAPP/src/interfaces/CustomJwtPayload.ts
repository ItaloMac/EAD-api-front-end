import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  userType: number;
}

console.log("CustomJwtPayload interface loaded");

export default CustomJwtPayload;