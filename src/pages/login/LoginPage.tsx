import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.title = "ACE | Login"
  }, [])

  return (
    <div className="bg-[hsl(var(--background))]">
      <div className="w-full h-screen flex items-center justify-center">
        <LoginCard />
      </div>
    </div>
  );
}

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const signInHandler = () => {
    // TODO: Dummy sign-in logic has been added for now. Needs to be fixed when 
    // connecting with a backend
    secureLocalStorage.setItem("token", email + " " + password);
    navigate("/dashboard");
  }

  return (
    <Card className="w-full max-w-sm border-0">
      <CardHeader>
        <CardTitle className="text-4xl">Admin Login</CardTitle>
        <CardDescription>
          Enter your email below to login to the admin panel.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="admin@example.com"
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }
            } required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="shh! secret"
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }
            }
            required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={signInHandler}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}

export default LoginPage;
