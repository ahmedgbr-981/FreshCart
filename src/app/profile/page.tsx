import { nextAuthOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Mail, ShieldCheck, UserRound } from 'lucide-react'

export default async function Profile() {
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
            My profile
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your account details in one place.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col items-start justify-between bg-[#174f3c] p-7 text-white sm:min-h-72 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
              <UserRound size={22} aria-hidden="true" />
            </span>
            <div className="mt-10">
              <h2 className="wrap-break-word text-2xl font-semibold">
                {session.user.name || 'FreshCart member'}
              </h2>
              <p className="mt-2 text-sm capitalize text-emerald-100/75">
                {session.user.role || 'Customer'}
              </p>
            </div>
          </div>

          <div className="border border-slate-900/10 bg-white p-6 sm:p-9">
            <h2 className="text-lg font-semibold text-slate-950">
              Profile information
            </h2>
            <div className="mt-6 border-t border-slate-900/10">
              <div className="flex items-start gap-4 border-b border-slate-900/10 py-5">
                <UserRound className="mt-0.5 text-emerald-700" size={18} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Name
                  </p>
                  <p className="mt-1 wrap-break-word text-sm font-medium text-slate-800">
                    {session.user.name || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-slate-900/10 py-5">
                <Mail className="mt-0.5 text-emerald-700" size={18} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Email address
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {session.user.email || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-slate-900/10 py-5">
                <UserRound className="mt-0.5 text-emerald-700" size={18} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {session.user.phone || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5">
                <ShieldCheck className="mt-0.5 text-emerald-700" size={18} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Account type
                  </p>
                  <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                    {session.user.role || 'Customer'}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/allorders"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
            >
              View my orders
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}