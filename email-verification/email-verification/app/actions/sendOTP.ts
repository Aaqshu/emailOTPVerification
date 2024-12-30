'use server'

import nodemailer from 'nodemailer'
import { cookies } from 'next/headers'

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendOTP(email: string) {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Store the OTP in a cookie (in a real app, use a more secure method)
  cookies().set('otp', otp, { httpOnly: true, maxAge: 300 }) // 5 minutes expiry

  // Send the email
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP for email verification is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    })

    return { success: true, message: 'OTP sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send OTP' }
  }
}

