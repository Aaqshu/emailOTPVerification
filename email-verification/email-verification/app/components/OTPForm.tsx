'use client'

import { useState } from 'react'
import { verifyOTP } from '../actions/verifyOTP'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function OTPForm({ email }: { email: string }) {
  const [otp, setOTP] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await verifyOTP(email, otp)
    setMessage(result.message)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <Button type="submit">Verify OTP</Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}

