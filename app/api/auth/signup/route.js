import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, address } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = new User({ name, email, phone, address });

    await newUser.save();
    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
