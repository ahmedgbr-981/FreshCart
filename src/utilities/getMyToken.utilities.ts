"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";



export default async function geyMyToken(){

    const codedToken=(await cookies()).get(`next-auth.session-token`)?.value
    const decodedToken= await decode({token:codedToken,secret:process.env.NEXTAUTH_SECRET!})

    return decodedToken?.token

}