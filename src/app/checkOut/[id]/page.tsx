import React from 'react'
import CheckOutForm from '../CheckOutForm'

export default async function CheckOut({params}:{params:Promise<{id:string}>}) {

  const {id}=await params

  console.log('id',id)
  return (
<>
<CheckOutForm id={id}/>
</>
  )
}
