import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-lg mb-4">
            <Sparkles className="w-8 h-8 text-[#0f1419]" />
          </div>
          <h1 className="text-white mb-2">
            kreativ<span className="text-emerald-400">pique</span>
          </h1>
          <p className="text-gray-400">AI Search Optimization Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8">
          <h2 className="text-white mb-6 text-center">Sign in to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-400">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-400">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded-md border-[#374151]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300">
              Contact sales
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          © 2025 kreativpique. All rights reserved.
        </div>
      </div>
    </div>
  );
}
