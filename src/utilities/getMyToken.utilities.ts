"use server"
import { log } from "console";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";



export default async function geyMyToken(){

    const codedToken=(await cookies()).get(`next-auth.session-token`)?.value
    const decodedToken= await decode({token:codedToken,secret:process.env.NEXTAUTH_SECRET!})
    log(decodedToken?.token)
    return decodedToken?.token

}