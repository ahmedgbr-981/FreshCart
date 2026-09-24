'use client'

import  { verifyCodeApi } from "@/AuthAction/Auth.action"
import { useRouter,  } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function VerifyCode() {
  const [code, setCode] = useState("")


  const router=useRouter()

 async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      const resp=await verifyCodeApi(code)
      console.log('vercode',resp)
      if(resp.status=='Success'){
        toast.success('success')
        router.push(`/resetPass`)
      }
      else{
        toast.error(resp.message)
      }
  }
  return (
    <form onSubmit={handleSubmit} className='w-[50%] mx-auto  rounded-2xl flex flex-col gap-5 my-5'>
        <input type="text" onChange={(e)=>setCode(e.target.value)}  placeholder='Enter Code' className='w-full focus:outline-green-400 p-5 rounded-2xl border border-green-600  ' />
        <button type='submit' className='py-2 bg-green-600 rounded-2xl text-white text-2xl cursor-pointer'>Confirm code</button>
        </form>
  )
}
