'use server'

import { cookies } from 'next/headers'

export async function verifyOTP(email: string, userOTP: string) {
  const storedOTP = cookies().get('otp')?.value

  if (storedOTP === userOTP) {
    // OTP is correct, clear the cookie
    cookies().delete('otp')
    // Here you would typically mark the email as verified in your database
    return { success: true, message: 'Email verified successfully' }
  } else {
    return { success: false, message: 'Invalid OTP' }
  }
}

