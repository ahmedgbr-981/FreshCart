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
import { loginSchema, loginSchemaType } from "../schema/login.schema";
import { signIn } from "next-auth/react";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const { handleSubmit } = form;

  interface FormFeild {
    name: "email" | "password";
    type: string;
    placeholder: string;
  }

  const formFields: FormFeild[] = [
    { name: "email", placeholder: "Enter your email", type: "email" },
    { name: "password", placeholder: "Enter your password", type: "password" },
  ];

  async function handelSignIn(values: loginSchemaType) {
    console.log(values);
    setIsLoading(true);
    // try {
    //   const resp = await fetch(
    //     `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(values),
    //       headers: { "Content-type": "application/json" },
    //     },
    //   );
    //   const data = await resp.json();
    //   console.log(data);
    //   if(data.message=='success'){
    //     toast.success('logged in',{
    //       position:'top-center',delay:1000,autoClose:1200
    //     })
    //     router.push('/')
    //   }

    //   else{
    //     toast.error(data.message,{
    //       position:'top-center',delay:1000,autoClose:1200
    //     })
    //   }
    // } catch (error) {
    //    toast.error('something went wrong',{
    //       position:'top-center',delay:1000,autoClose:1200
    //     })
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const resp = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (resp?.ok) {
        toast.success("logged in", { position: "top-center", delay: 1000 });
        router.push("/");
      } else {
        toast.error(resp?.error || "something went wrong", {
          position: "top-center",
          delay: 1000,
          autoClose: 1200,
        });
      }
    } catch (error) {
      toast.error("something went wrong", {
        position: "top-center",
        delay: 1000,
        autoClose: 1200,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-[90%] lg:w-[60%] rounded-2xl p-5 shadow-2xl shadow-green-300 mt-10 mx-auto">
        <h2 className="p-4 text-2xl">Hello to freshcart signUp now</h2>

        <form onSubmit={handleSubmit(handelSignIn)}>
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
            Has no account?{" "}
            <Link href={"/register"} className="text-green-700 hover:underline">
              Sign UP
            </Link>
          </span>
          <Button
            className="w-full bg-green-600 hover:bg-green-400 cursor-pointer p-3 mt-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </>
  );
}
