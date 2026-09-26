import React from 'react'
import Navbar from '../(pages)/navbar/page'
import CartIcon from '../CartIcon/CartIcon'
import getUserWishList from '@/wishListAction/Getloggeduserwishlist.acction'

export default async function NavbarWrapper() {
  const wishlist = await getUserWishList().catch(() => null)
  const wishlistCount = Array.isArray(wishlist?.data) ? wishlist.data.length : 0

  return (
    <>
    <Navbar cartIcon={<CartIcon/>} wishlistCount={wishlistCount}/>
    </>
  )
}
