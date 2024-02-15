'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, signInWithGoogle } from "@/lib/auth";

import { useState } from "react";


const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void }) => {
      event.preventDefault()
      const { result, error } = await signIn(email, password)
      if (error) {
        if (error.code === 'auth/invalid-login-credentials') {
          //toast.error('Your password is incorrect', { position: 'bottom-right' })
        } else {
          //toast.error('An error occurred during sign-in')
        }
        console.log(error)
        return
      }
      // Redirect to the admin page
      router.push('/home')
    }


    const handleGoogleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault()
      const { result, error } = await signInWithGoogle()
      if (error) {
        if (error.code === 'auth/invalid-login-credentials') {
          //toast.error('Your password is incorrect', { position: 'bottom-right' })
        } else {
          //toast.error('An error occurred during sign-in')
        }
        console.log(error)
        return
      }
      // Redirect to the admin page
      router.push('/home')
    }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleForm}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-5" variant={"outline"} type="submit">
            Login
          </Button>
        </form>
        <Separator className="my-6" />
        <CardTitle>Or Sign In with</CardTitle>
        <div className="flex justify-between my-6">
          <Button className="w-full" variant={"outline"} onClick={handleGoogleSubmit}>
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
