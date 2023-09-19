"use server";
import React from "react"
import { Resend } from "resend"
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
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
            react: React.createElement(ContactFormEmail, {
                message: message as string,
                senderEmail: senderEmail as string
            })
            // react: <ContactFormEmail message={message} senderEmail={senderEmail}/>
        })
    } catch (error: unknown) {
        return {
           error: getErrorMessage(error) 
        }
        
    }
}