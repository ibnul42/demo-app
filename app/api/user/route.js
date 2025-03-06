import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token.value);
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
