import WishListItems from '@/components/WishListItems/WishListItems'
import { wishListType } from '@/types/wishListType.types'
import getUserWishList from '@/wishListAction/Getloggeduserwishlist.acction'

export default async function WishList() {

    const resp=await getUserWishList()
    console.log(resp)

    if(resp.data.length==0){
      return <h1 className='text-center text-4xl text-gray-500'>
        Your wishlist is empty
      </h1>
    }
  
  return (
<>
    <h2 className='p-5 text-2xl'>My wishList</h2>
{
  resp.data.map((p:wishListType)=><WishListItems product={p}/>)
}
</> 
 )
}
