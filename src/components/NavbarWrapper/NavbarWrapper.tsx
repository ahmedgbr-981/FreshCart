import React from 'react'
import Navbar from '../(pages)/navbar/page'
import CartIcon from '../CartIcon/CartIcon'

export default function NavbarWrapper() {
  return (
    <>
    <Navbar cartIcon={<CartIcon/>}/>
    </>
  )
}
