import { Loader } from 'lucide-react'
import Image from 'next/image'

export default function loading() {
  return (
    <div className=' min-h-screen flex items-center justify-center text-green-500'>
       <Image
        src="/runingCart.png"
        alt="Loading..."
        width={400}
        height={400}
        className="animate-[drive_2s_ease-in-out_infinite] "
      />
    </div>
  )
}
