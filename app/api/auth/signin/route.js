import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set token as a cookie
    const serialized = serialize("token", token, {
      httpOnly: true, // More secure, prevents JS access
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return new Response(
      JSON.stringify({ message: "User signed in successfully" }),
      {
        status: 200,
        headers: { "Set-Cookie": serialized },
      }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
