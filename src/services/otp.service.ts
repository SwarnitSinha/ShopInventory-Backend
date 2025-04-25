import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { verifyOtp } from "../controllers/auth.controller";

//load environment variables from .env file
dotenv.config();

export const OtpService = {
  async sendOtp(emailAddress: string) {
    console.log("Coming here for otp sending", emailAddress);

    console.log("PASS:: " , process.env.EMAIL_PASSWORD);
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // or 587
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_ADDRESS, // Your email address
        pass: process.env.EMAIL_PASSWORD // Use an app password or real password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Shop Sage" <your-email@gmail.com>`, // Display name + email
      to: emailAddress,
      subject: "Your One-Time Password (OTP) for Shop Sage",
      text: `Dear User,
    
    Your one-time password (OTP) is: 123456
    
    Please use this code to verify your identity. This OTP is valid for the next 10 minutes.
    
    If you did not request this, please ignore this email.
    
    Thank you,
    Shop Sage Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4CAF50;">Shop Sage - OTP Verification</h2>
          <p>Dear User,</p>
          <p>Your one-time password (OTP) is:</p>
          <h3 style="color: #333; background: #f4f4f4; padding: 10px; display: inline-block;">123456</h3>
          <p>This OTP is valid for the next <strong>10 minutes</strong>.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <br />
          <p>Best regards,<br /><strong>Shop Sage Team</strong></p>
        </div>
      `,
    };
    

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return "OTP sent successfully";
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send OTP");
    }
  },

  async verifyOtp(emailAddress: string, otp: string) {
    if(otp === "123456") {
      return true; // OTP is valid
    }
    return false; // OTP is invalid
  }
}