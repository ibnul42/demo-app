import jwt from "jsonwebtoken";
import User from "@/models/User"; // Your user model

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
    const user = await User.findById(decoded.userId); // Fetch user from database based on the userId in the token
    if (!user) {
      throw new Error("User not found");
    }
    return user; // Return the user object
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
