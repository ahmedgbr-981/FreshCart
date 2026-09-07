import z, { email } from "zod";

export const loginSchema = z.object({
    email:z.string().pipe(z.email()),
    password:z.string().min(6,'password must be at least 6'),
})

export type loginSchemaType = z.infer<typeof loginSchema>