import { serialize } from "cookie";

export async function POST() {
  const serialized = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return new Response(
    JSON.stringify({ message: "User logged out successfully" }),
    {
      status: 200,
      headers: { "Set-Cookie": serialized },
    }
  );
}
