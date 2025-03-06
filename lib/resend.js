'use server'

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async() =>{
    await resend.emails.send({
        // to: "contact@the12councils.com",
        to: "ibnulashir42@gmail.com",
        from: "noreply@example.com",
        subject: "Test Email",
        html: "<h1>Hello World!</h1>",
    })
}