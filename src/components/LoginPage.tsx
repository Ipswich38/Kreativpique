import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, signUp } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, agencyName);
        if (error) {
          setError(error.message);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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

        {/* Auth Form */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8">
          <h2 className="text-white mb-6 text-center">
            {isSignUp ? "Create your agency account" : "Sign in to your account"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="agencyName" className="text-gray-400">Agency Name</Label>
                <Input
                  id="agencyName"
                  type="text"
                  placeholder="Enter your agency name"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                  required
                />
              </div>
            )}

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
                placeholder={isSignUp ? "Create a password (min 8 characters)" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                minLength={isSignUp ? 8 : undefined}
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded-md border-[#374151]" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-emerald-400 hover:text-emerald-300">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
            >
              {isLoading
                ? (isSignUp ? "Creating account..." : "Signing in...")
                : (isSignUp ? "Create Account" : "Sign in")
              }
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {isSignUp ? "Sign in" : "Create account"}
            </button>
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
