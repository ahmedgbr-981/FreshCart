import z, { email } from "zod";

export const registerSchema = z.object({
    name:z.string().min(3,'name must be more than 2').max(15,'nme must be less than 15'),
    email:z.string().pipe(z.email()),
    password:z.string().min(6,'password must be at least 6'),
    rePassword:z.string().min(1,'rePassword is required '),
    phone:z.string().min(1,'phone is required').regex(/^01[0125][0-9]{8}$/,'invalid egy number')
}).refine((obj)=>obj.password===obj.rePassword,{
    path:['rePassword'],
    error:'passwrod and rePassword do not match'
})

export type registerSchemaType = z.infer<typeof registerSchema>