import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { user, subject, htmlContent } = await req.json();

    if (!user || !subject || !htmlContent) {
      return NextResponse.json(
        { success: false, error: "Missing required data" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["contact@the12councils.com"],
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
