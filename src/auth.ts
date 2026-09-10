import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const baseUrl = process.env.API ?? "https://ecommerce.routemisr.com/api/v1";

export const nextAuthOptions: NextAuthOptions = {

    pages:{
        signIn:'/login'
    },
    providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                email:{},
                password:{},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const resp = await fetch(`${baseUrl}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                const payload = await resp.json();
                if (!resp.ok || payload.message !== "success" || !payload.token) {
                    return null;
                }

                const decodedToken: { id: string } = jwtDecode(payload.token);
                if (!decodedToken.id) {
                    return null;
                }

                return {
                    id: decodedToken.id,
                    user: payload.user,
                    token: payload.token,
                };
            }
        })
    ],

    callbacks:{
        async jwt({token,user}){
           if(user){
             token.user = user.user,
            token.token = user.token
           }
            return token
        },

        async session({session,token}){
            session.user =token.user
            return session
        }
    }
}