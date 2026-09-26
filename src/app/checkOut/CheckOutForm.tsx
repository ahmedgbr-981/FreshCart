"use client";

import { Controller, useForm } from "react-hook-form";
import { Banknote, CreditCard, Loader2, PackageCheck } from "lucide-react";
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
    label: string;
    placeholder: string;
    autoComplete: string;
  }

  const formFields: FormFeild[] = [
    {
      name: "details",
      label: "Street address",
      placeholder: "Street and building number",
      type: "text",
      autoComplete: "street-address",
    },
    {
      name: "phone",
      label: "Phone number",
      placeholder: "Enter your phone number",
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      type: "text",
      autoComplete: "address-level2",
    },
    {
      name: "postalCode",
      label: "Postal code",
      placeholder: "Enter your postal code",
      type: "text",
      autoComplete: "postal-code",
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
        window.location.assign(payload.session.url);
        setIsLoading(false);
      } else {
        toast.error("error!");
      }
    }
  }
  return (
    <main className="mx-auto my-8 w-full max-w-3xl px-4 sm:my-12">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-52px_rgba(60,60,60,0.38)]">
        <header className="flex items-center gap-4 border-b border-green-100 bg-green-50 px-6 py-6 sm:px-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500 text-slate-900">
            <PackageCheck size={22} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Delivery details
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Where should we send your order?
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(handlePay)}
          aria-busy={isLoading}
          className="p-6 sm:p-8"
        >
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {formFields.map((fieldConfig) => (
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={fieldConfig.name === "details" ? "sm:col-span-2" : ""}
                  >
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-slate-700"
                    >
                      {fieldConfig.label}
                    </label>
                    <Input
                      className="h-12 rounded-lg border-slate-300 bg-white px-4 text-sm placeholder:text-slate-400"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={fieldConfig.placeholder}
                      autoComplete={fieldConfig.autoComplete}
                      type={fieldConfig.type}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </div>

          <section className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900">Payment method</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose how you would like to pay.
            </p>

            {isLoading ? (
              <div
                role="status"
                className="mt-5 flex min-h-14 items-center justify-center gap-3 rounded-xl bg-green-50 px-4 text-sm font-semibold text-green-800"
              >
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                <span>Processing your payment...</span>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => setPay_Online(true)}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border-b-4 border-green-700 bg-green-500 px-5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-green-400 active:translate-y-1 active:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                  type="submit"
                  disabled={isLoading}
                >
                  <CreditCard size={18} aria-hidden="true" />
                  Pay with a card
                </Button>
                <Button
                  onClick={() => setPay_Cash(true)}
                  variant="outline"
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border-b-4 border-green-700 bg-white px-5 text-sm font-bold text-green-800 shadow-sm transition-all hover:bg-green-50 active:translate-y-1 active:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                  type="submit"
                  disabled={isLoading}
                >
                  <Banknote size={18} aria-hidden="true" />
                  Pay cash
                </Button>
              </div>
            )}
          </section>
        </form>
      </section>
    </main>
  );
}

export interface ShippingData {
  details: "";
  phone: "";
  city: "";
  postalCode: "";
}
