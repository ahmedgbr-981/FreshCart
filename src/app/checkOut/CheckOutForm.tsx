"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import payCash from "@/paymentAction/payCash.action";
import { toast } from "react-toastify";
import payOnline from "@/paymentAction/payOnline.action";
import { useRouter } from "next/navigation";

export default function CheckOutForm({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pay_Cash, setPay_Cash] = useState(false);
  const [pay_Online, setPay_Online] = useState(false);
  const router=useRouter()

  interface FormFeild {
    name: "details" | "phone" | "city" | "postalCode";
    type: string;
    placeholder: string;
  }

  const formFields: FormFeild[] = [
    { name: "details", placeholder: "Enter your details", type: "details" },
    { name: "phone", placeholder: "Enter your phone", type: "phone" },
    { name: "city", placeholder: "Enter your city", type: "city" },
    {
      name: "postalCode",
      placeholder: "Enter your postalCode",
      type: "postalCode",
    },
  ];

  const { handleSubmit, control } = useForm<ShippingData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  async function handlePay(data: ShippingData) {
    console.log("paid", data);

    setIsLoading(true);

    if (pay_Cash) {
      const payload = await payCash(id, data);
      console.log("CashPayload", payload);
      if (payload.status == "success") {
        toast.success(payload.message);
        router.push('/')
        router.refresh()
        setIsLoading(false);
      } else {
        toast.error("error!");
      }
    }

    if (pay_Online) {
      const payload = await payOnline(id, data);
      if (payload.status == "success") {
        toast.success(payload.message);
        window.location.href = payload.session.url;
        setIsLoading(false);
      } else {
        toast.error("error!");
      }
    }
  }
  return (
    <div className="w-1/2 mx-auto my-10 p-10">
      <h2>Check out</h2>
      <form onSubmit={handleSubmit(handlePay)}>
        {formFields.map((f) => (
          <Controller
            key={f.name}
            name={f.name}
            control={control}
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

       {
        isLoading? <div className="flex justify-center items-center w-full"><Loader2 className="animate-spin text-green-400 text-2xl"/></div>:<>
         <Button
          onClick={() => setPay_Online(true)}
          className="w-full bg-green-600 hover:bg-green-400 cursor-pointer p-3 mt-4"
          type="submit"
          disabled={isLoading}
        >
          Pay with a card
        </Button>
        <Button
          onClick={() => setPay_Cash(true)}
          className="w-full bg-green-600 hover:bg-green-400 cursor-pointer p-3 mt-4"
          type="submit"
          disabled={isLoading}
        >
          Pay cash
        </Button></>
       }
      </form>
    </div>
  );
}

export interface ShippingData {
  details: "";
  phone: "";
  city: "";
  postalCode: "";
}
