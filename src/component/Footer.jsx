import { Mail, Phone, ExternalLink, MessageCircle, Instagram, Facebook, Youtube, Shield, Award, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background SVG overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%2030h60v1H0zM30%200v60h1V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-lg">TP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trade Pro
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in online trading. Experience professional trading with advanced tools, comprehensive education, and exceptional support.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">support@tradepro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "AML & KYC", "Payment Policy", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trading Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Trading</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                ["Forex Trading", "hover:text-blue-400"],
                ["Stock Trading", "hover:text-green-400"],
                ["Commodities", "hover:text-yellow-400"],
                ["Crypto Trading", "hover:text-purple-400"],
                ["Trading Signals", "hover:text-pink-400"],
              ].map(([name, color]) => (
                <li key={name}>
                  <a href="#" className={`flex items-center group transition-colors ${color}`}>
                    <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-3">
              {[
                ["Telegram", "from-blue-500 to-cyan-500", MessageCircle],
                ["Instagram", "from-pink-500 to-purple-500", Instagram],
                ["Facebook", "from-blue-500 to-indigo-500", Facebook],
                ["YouTube", "from-red-500 to-pink-500", Youtube],
              ].map(([label, gradient, Icon]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`relative w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg group`}
                >
                  <Icon className="w-6 h-6 text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Trading Hours</span>
                </div>
                <p className="text-gray-300">Monday - Friday: 24/5</p>
                <p className="text-gray-300">Support: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Regulated & Licensed</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                <p>© 2025 Trade Pro. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</span>
                <span>•</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Risk Disclosure</span>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-500 text-center md:text-left leading-relaxed">
              <p>
                Trade Pro is a registered trademark. Trading involves risk of loss and may not be suitable for all investors. Please read our full risk disclosure and terms of service before trading. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
