'use client'
export default function error({error}:{error:Error}) {
  return (
    <div className='min-h-screen flex items-center justify-center '>
        <span className="text-4xl bg-red-400 rounded-2xl p-5">{error.message}</span>
    </div>
  )
}
