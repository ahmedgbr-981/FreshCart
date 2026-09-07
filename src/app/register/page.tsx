"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router =useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const { handleSubmit } = form;

  interface FormFeild {
    name: "name" | "email" | "password" | "rePassword" | "phone";
    type: string;
    placeholder: string;
  }

  const formFields: FormFeild[] = [
    { name: "name", placeholder: "Enter your name", type: "text" },
    { name: "email", placeholder: "Enter your email", type: "email" },
    { name: "password", placeholder: "Enter your password", type: "password" },
    {
      name: "rePassword",
      placeholder: "Confirm your Password",
      type: "password",
    },
    { name: "phone", placeholder: "Enter your phone", type: "text" },
  ];

  async function handelSignUp(values: registerSchemaType) {
    console.log(values);
    setIsLoading(true);
    try {
      const resp = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json" },
        },
      );
      const data = await resp.json();
      console.log(data);
      if(data.message=='success'){
        toast.success('account created',{
          position:'top-center',delay:1000,autoClose:1200
        })
        router.push('/login')
      }

      else{
        toast.error(data.message,{
          position:'top-center',delay:1000,autoClose:1200
        })
      }
    } catch (error) {
       toast.error('something went wrong',{
          position:'top-center',delay:1000,autoClose:1200
        })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] lg:w-[60%] rounded-2xl p-5 shadow-2xl shadow-green-300 mt-10 mx-auto">
        <h2 className="p-4 text-2xl">Hello to freshcart signUp now</h2>

        <form onSubmit={handleSubmit(handelSignUp)}>
          {formFields.map((f) => (
            <Controller
              key={f.name}
              name={f.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    className="my-5 p-5"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={f.placeholder}
                    autoComplete="name"
                    type={f.type}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
          <span>
            Already have an account?{" "}
            <Link href={"/login"} className="text-green-700 hover:underline">
              Login
            </Link>
          </span>
          <Button
            className="w-full bg-green-600 hover:bg-green-400 cursor-pointer p-3 mt-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </>
  );
}
