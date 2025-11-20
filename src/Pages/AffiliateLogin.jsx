import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import BASE from "../config";
import { Eye, EyeOff } from "lucide-react"; 

export default function AffiliateLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 
   const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${BASE.BASE_URL}/affiliate/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login Response:", data);
      setLoading(false);

      if (data.statusCode ===200) {

    
        const token = data.result.token; 
        localStorage.setItem('token', token);
    

       
        localStorage.setItem("affiliate_token", token);
         localStorage.setItem("code", data.result.affiliate.code);
        localStorage.setItem("affiliate_user", JSON.stringify(data.result.user)); 


      
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, `,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard")); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Server not responding or network error.",
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-xl relative z-10">
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

        <div className="px-6 pb-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-3 bg-gray-800/50 border-gray-700 text-white w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
  <div className="space-y-2">
  <label htmlFor="password" className="text-sm font-medium text-gray-300">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"} 
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      required
      className="pl-3 pr-10 bg-gray-800/50 border-gray-700 text-white w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
    />

    {/* 👇 Toggle Button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
</div>
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md py-3 font-semibold transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log  Affiliate "}
            </button>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Don’t have an affiliate account?{" "}
                <Link to="/affiliateSignup">
                  <button type="button" className="text-blue-400 hover:text-blue-300">
                    Sign Up Now
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
