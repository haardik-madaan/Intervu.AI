"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthFormSchema = (type : FormType) => {
  return z.object({
    name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}

const AuthForm = ({type} : {type : FormType}) => {
  const router = useRouter();
  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === 'sign-up'){
        toast.success("Account created successfull, Proceed to Sign In");
        router.push('/sign-in');
      }
      else{
        toast.success("User Signed In successfully!")
        router.push('/')
      }
    }
    catch(error){
      console.log(error);
      toast.error("There was an error ${error}")
    }
    console.log(values)
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[556px]">

      <div className="flex flex-col gap-6 card py-14 px-10 items-center">

        <div className="flex flex-row gap-2 justify-center">
          <Image src = "/logo.svg" alt="logo" height={32} width={38}/>
          <h2 className="text-primary-100">PrepWise</h2> 
        </div>

        <h3>Practice mock interviews with AI</h3>

      

    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && 
        (
          <FormField control={form.control} name="name" label="Name" description="This is your public display name." placeholder="Your name"/>
        )
        } 
        <FormField control={form.control} name="email" label="Email" placeholder="Your email" type="email"/>
        <FormField control={form.control} name="password" label="Password" placeholder="Your password" description = "Password must contain atleast 8 characters." type="password"/>

        <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}

      <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? 'Sign In' : 'Sign Up'}</Link> 
    </p>
    </div>
    </div>
  )
}

export default AuthForm