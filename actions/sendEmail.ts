'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendVerificationEmail(email: string, name: string, link: string) {
  try {
    //send the email
    transporter.sendMail({
      from: `The CoseCloset <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Please verify your email address',
      html: `<html><body>
        <div>
          <h2>Email Verification</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If you did not create an account, please ignore this email.</p>
        </div>
      </body>
    </html>
        `
    });

    return true;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error in sendVerificationEmail: ', error.message);
    return false;
  }
}

export async function sendOTPMail(email: string, otp: string) {
  try {
    //send the email
    transporter.sendMail({
      from: `The CoseCloset <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Please verify your email address',
      html: ` <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Login Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .code {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div className="container">
          <h2>Your One-Time Password</h2>
          <p>Hello,</p>
          <p>You've requested to log in to your account. Please use the following one-time password (OTP) to complete your login:</p>
          <div className="code">${otp}</div>
          <p>This code will expire in {expiryTime} for security reasons. If you didn't request this code, please ignore this email.</p>
          <p>Thank you for using our service!</p>
          <p>Best regards,<br />The CoseCloset Team</p>
        </div>
      </body>
    </html>
        `
    });

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error in sendOTPMail: ', error.message);
    return false;
  }
}