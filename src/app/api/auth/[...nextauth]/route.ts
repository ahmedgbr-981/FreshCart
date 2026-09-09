// import { NextRequest, NextResponse } from 'next/server';
// import { RequestInternal } from '../../../../../node_modules/next-auth/core';


// export async  function GET(request:NextRequest){
//     // const data ={
//     //     message:"success",
//     //     status:200,
//     //     users:[
//     //     {id:1,name:'ali',age:14},
//     //     {id:2,name:'ali',age:14},
//     //     {id:3,name:'ali',age:14},
//     //     {id:4,name:'ali',age:14},
//     //     {id:5,name:'ali',age:14},
//     // ]
//     // }

//     const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
//     const data =await resp.json()
//     return NextResponse.json(data)
// }


import { nextAuthOptions } from "@/auth"
import NextAuth from "next-auth"

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }