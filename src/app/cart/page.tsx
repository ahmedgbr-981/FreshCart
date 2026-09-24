import getUserCart from '@/cartAction/getUserCart'
import CartTable from '@/app/components/cartTable/cartTable'
import { log } from 'console'


export default async function Cart() {
    const resp=await getUserCart()
    log(resp)
  return (
   <>
   <CartTable cart={resp.data}/>
   </>
  )
}
