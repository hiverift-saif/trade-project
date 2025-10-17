export default function AffiliateLogin() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Card */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-xl relative z-10">
        {/* Header */}
        <div className="grid auto-rows-min items-start gap-1.5 px-6 pt-6 space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <span className="text-2xl text-white">Trade Pro</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-2xl text-white">Affiliate Login</h4>
            <p className="text-gray-400">Welcome back! Log in to your affiliate account</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <form className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md py-3 font-semibold transition-all"
            >
              Log In to Affiliate Account
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full bg-gray-800/30 border border-gray-700 text-white rounded-md py-2 hover:bg-gray-800"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full bg-gray-800/30 border border-gray-700 text-white rounded-md py-2 hover:bg-gray-800"
              >
                Microsoft
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Don’t have an affiliate account?{" "}
                <button type="button" className="text-blue-400 hover:text-blue-300">
                  Sign Up Now
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
