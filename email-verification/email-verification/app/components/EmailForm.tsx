'use client'

import { useState } from 'react'
import { sendOTP } from '../actions/sendOTP'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EmailForm({ onEmailSent }: { onEmailSent: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await sendOTP(email)
    setMessage(result.message)
    if (result.success) {
      onEmailSent(email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <Button type="submit">Send OTP</Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}

