"use client"

import {useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import type { TLoginFormValues } from '@/lib/schema/authentication-schema';
import { LoginSchema } from '@/lib/schema/authentication-schema';
import { loginUserAction } from '@/lib/services/server-actions/authentication';
import {useRouter} from "next/navigation";
import {useAction} from "next-safe-action/hooks";


export function LoginForm() {

  const [error, setError] = useState<string | undefined>("");

  const {executeAsync, isExecuting} = useAction(loginUserAction);
  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
      },
  });
  
  const router = useRouter();
  // const router = useRouter();
  function onSubmit() {
    console.log("Form submitted");
  }

  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl bg-white p-4 md:p-12">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
          <FormField
                    disabled={isExecuting}
                    name="Username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} placeholder="Enter your username from Clarify.go"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
          />
          <FormField
                    disabled={isExecuting}
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} placeholder="Enter your password"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="h-[40px] w-full bg-button text-gray-100"
                    disabled={isExecuting}
                >
                    {isExecuting ? "Logging in" : "Log in"}
                </Button>
            <div className="flex justify-center text-sm mt-2">
              <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
            </div>
            <div className="text-center mt-4">
              <a href="/admin/activity" className="text-blue-600 hover:underline">Admin Login</a>
            </div>
        </form>
        </Form>
      </div>
    </div>
  );
}