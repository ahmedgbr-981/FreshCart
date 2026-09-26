'use server'

import { nextAuthOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import getMyToken from '@/utilities/getMyToken.utilities'

type ProfileUpdate = {
  name: string
  email: string
  phone?: string
}

export default async function updateProfile(profile: ProfileUpdate) {
  const [token, session] = await Promise.all([
    getMyToken(),
    getServerSession(nextAuthOptions),
  ])

  if (!token || !session?.user) {
    return { success: false, message: 'Your session has expired. Please sign in again.' }
  }

  const name = profile.name.trim()
  const email = profile.email.trim()
  const phone = profile.phone?.trim()
  const emailChanged = email.toLowerCase() !== session.user.email?.trim().toLowerCase()

  if (!name || !email) {
    return { success: false, message: 'Name and email are required.' }
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
      method: 'PUT',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        ...(emailChanged ? { email } : {}),
        ...(phone ? { phone } : {}),
      }),
    })
    const payload = await response.json()

    return {
      success: response.ok,
      message: response.ok
        ? payload.message ?? 'Profile updated successfully.'
        : payload.errors?.msg ?? payload.message ?? 'Could not update your profile.',
    }
  } catch {
    return { success: false, message: 'Unable to reach the profile service. Try again.' }
  }
}