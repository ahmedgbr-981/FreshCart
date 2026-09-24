'use client'

import forgotPass from "@/AuthAction/Auth.action"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ForgotPassword() {

  const [email, setEmail] = useState('')

  const router=useRouter()

 async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      const resp=await forgotPass(email)
      if(resp.statusMsg=='success'){
        toast.success(resp.message)
        router.push(`/verifyCode`)
      }
      else{
        toast.error(resp.message)
      }
  }
  return (
    <form onSubmit={handleSubmit} className='w-[50%] mx-auto  rounded-2xl flex flex-col gap-5 my-5'>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter email' className='w-full focus:outline-green-400 p-5 rounded-2xl border border-green-600  ' />
        <button type='submit' className='py-2 bg-green-600 rounded-2xl text-white text-2xl cursor-pointer'>Send Reset</button>
        </form>
  )
}
