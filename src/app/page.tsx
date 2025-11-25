"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ElectricBorder from "@/components/ElectricBorder";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd use a more secure authentication method.
    if (email === "admin@example.com" && password === "password123") {
      localStorage.setItem("isAdminAuthenticated", "true");
      router.push("/admin");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Incorrect email or password. Please try again.",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-[#0A2A64] to-black text-white">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Admin Login
        </h1>
        <p className="text-lg text-gray-400 mt-2 mb-12">
          Enter your credentials to access the admin dashboard.
        </p>
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: "1rem" }}
        >
          <div className="relative w-full max-w-sm mx-auto p-8 bg-black/20 backdrop-blur-lg border border-transparent rounded-2xl shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6 text-left">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="mt-2"
                />
              </div>
              <div className="text-center pt-2 flex flex-col sm:flex-row gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  Login
                </Button>
                 <Link href="/portfolio" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                        Back to Home
                    </Button>
                </Link>
              </div>
            </form>
          </div>
        </ElectricBorder>
      </div>
    </main>
  );
};

export default LoginPage;
