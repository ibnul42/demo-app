import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change this if you're using another email provider
      auth: {
        user: "ibnulashir42@gmail.com",
        pass: "hweo vmxk lloz haf",
      },
    });

    // Mail options
    const mailOptions = {
      from: "ibnulashir42@gmail.com",
      to: "issarfiber@gmail.com", // Change to the recipient email
      subject: subject || "New Message from Contact Form",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
