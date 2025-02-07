"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import type { TLoginFormValues } from '@/lib/schema/authentication-schema';
import { LoginSchema } from '@/lib/schema/authentication-schema';
import { loginUserAction } from '@/lib/services/server-actions/authentication';
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";
import { extractStringValues } from '@/lib/handlers/extract-string-values-in-nested-objs';
import { handleApiClientSideError } from '@/lib/handlers/api-response-handlers/handle-use-client-response';


export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const { executeAsync, isExecuting, result } = useAction(loginUserAction);
  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    await executeAsync(values)
      .then((result) => {
        const data = result?.data; // ALl response are nested in a data key by next-safe-action
        const message = data?.successMessage;
        const errors = data?.errors;

        if (errors) {
          const errorArray = extractStringValues(errors);
          setError(errorArray.join(", "));
          return;
        }
      })
      .finally(() => {
        router.replace("/admin/activity");
        handleApiClientSideError({
          success: result?.data?.successMessage,
          isSuccessToast: true
        })
      });
    form.reset(form.getValues());
  }

  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl bg-white p-4 md:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
            <FormField
              disabled={isExecuting}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Enter your username from Clarify.go" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isExecuting}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-lime-600 text-white py-3 rounded-md mt-4 text-lg font-medium hover:bg-lime-700 transition"
              disabled={isExecuting}
            >
              {isExecuting ? "Logging in" : "Log in"}
            </Button>
          </form>
        </Form>
        <div className="flex justify-center text-sm mt-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
        </div>
        <div className="text-center mt-4">
          <a href="/admin/activity" className="text-blue-600 hover:underline">Admin Login</a>
        </div>
      </div>
    </div>
  );
}