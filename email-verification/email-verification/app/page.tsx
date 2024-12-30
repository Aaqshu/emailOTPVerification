'use client'

import { useState } from 'react'
import { EmailForm } from './components/EmailForm'
import { OTPForm } from './components/OTPForm'

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Email Verification</h1>
        {!email ? (
          <EmailForm onEmailSent={setEmail} />
        ) : (
          <OTPForm email={email} />
        )}
      </div>
    </div>
  )
}

