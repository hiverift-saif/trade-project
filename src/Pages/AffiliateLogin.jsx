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

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Login Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: "affiliate", // 🔥 ADDED ROLE
      };

      const res = await fetch(`${BASE.AFFILIATE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 200 || res.status === 201) {
        const token = data.data?.access_token;
        const user = data.data?.user;

        if (!token) {
          return Swal.fire({
            icon: "error",
            title: "Token missing in backend response!",
          });
        }

        localStorage.setItem("affiliate_token", token);
        localStorage.setItem("affiliate_user", JSON.stringify(user));

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/affiliate/dashboard"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "API not responding.",
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/60 border-gray-800 backdrop-blur-xl relative z-10">
        
        <div className="grid items-start gap-1.5 px-6 pt-6 space-y-4">
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
            <p className="text-gray-400">Welcome back!</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-800/50 w-full text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 w-full border border-gray-700 text-white rounded-md px-3 py-2 pr-10 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md py-3 font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login Affiliate"}
            </button>

            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Don’t have an affiliate account?{" "}
                <Link to="/affiliateSignup">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    Sign Up Now
                  </span>
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

