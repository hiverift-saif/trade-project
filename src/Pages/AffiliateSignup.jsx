import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

export default function AffiliateSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-xl relative z-10">
        <div className="px-6 pt-6 text-center space-y-4">
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <span className="text-2xl text-white">Trade Pro</span>
          </div>
          <div>
            <h4 className="text-2xl text-white">Join as an Affiliate</h4>
            <p className="text-gray-400">
              Create your affiliate account and start earning
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <form className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1 border-gray-600 rounded" />
              <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                I agree to the{" "}
                <span className="text-blue-400 hover:underline">Terms & Conditions</span> and{" "}
                <span className="text-blue-400 hover:underline">Affiliate Agreement</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-9 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md flex items-center justify-center font-medium transition-all"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Affiliate Account
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900/50 px-2 text-gray-400">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full h-9 bg-gray-800/30 border border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 rounded-md flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
                Google
              </button>

              <button className="w-full h-9 bg-gray-800/30 border border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 rounded-md flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"></path>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Login link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
