"use server";

import { Resend } from "resend"
import { validateString, getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY)


 export const sendEmail = async (formData: FormData) =>{
    console.log("Running on server")
    const senderEmail = formData.get("senderEmail")
    const message = formData.get("message")


    //simple server side validation
    if(!validateString(senderEmail, 500)){
        return {
            error: "invalid sender email"
        }
    }
    if(!validateString(message, 5000)){
        return {
            error: "invalid message"
        }
    }
    
    try {
        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "rfaltu77@gmail.com",
            subject: "Message from Contact form",
            reply_to: senderEmail as string,
            text: message as string,
        })
    } catch (error: unknown) {
        return {
           error: getErrorMessage(error) 
        }
        
    }
}