import { log } from 'console'
import getMyToken from '../../utilities/getMyToken.utilities'


export default async function Cart() {

  const resp=await getMyToken()
  log(resp)
  return (
    <div>Cart</div>
  )
}
