import { nextAuthOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import UpdateProfileForm from './UpdateProfileForm'

export default async function Settings() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) redirect('/login')

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <header className="mb-8 border-b border-black/10 pb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Your account
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
            Settings
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Manage your profile details and account security.
          </p>
        </header>

        <UpdateProfileForm
          profile={{
            name: session.user.name ?? '',
            email: session.user.email ?? '',
            phone: session.user.phone ?? '',
          }}
        />

        <div className="divide-y divide-slate-900/10 border-y border-slate-900/10 bg-white">
          <article className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                <LockKeyhole size={18} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-slate-950">Password and security</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Start the password reset process for your account.
                </p>
              </div>
            </div>
            <Link
              href="/forgotPassword"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
            >
              Reset password
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}