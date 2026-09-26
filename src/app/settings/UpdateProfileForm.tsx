'use client'

import updateProfile from './updateProfile.action'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Save } from 'lucide-react'

type Profile = {
  name: string
  email: string
  phone: string
}

export default function UpdateProfileForm({ profile }: { profile: Profile }) {
  const { update } = useSession()
  const [values, setValues] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')

    const result = await updateProfile(values)
    setIsSaving(false)
    setMessage(result.message)
    setIsError(!result.success)

    if (result.success) {
      await update({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 border border-slate-900/10 bg-white p-6 sm:p-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <h2 className="text-lg font-semibold text-slate-950">Profile information</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Update the name and contact details on your account.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Name
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="h-11 rounded-md border border-slate-900/15 bg-white px-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email address
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="h-11 rounded-md border border-slate-900/15 bg-white px-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          Phone
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="h-11 rounded-md border border-slate-900/15 bg-white px-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 sm:max-w-md"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} aria-hidden="true" />
          {isSaving ? 'Saving...' : 'Save changes'}
        </button>
        {message && (
          <p role="status" className={`text-sm ${isError ? 'text-red-700' : 'text-emerald-800'}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  )
}