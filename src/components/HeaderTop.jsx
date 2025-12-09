import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight, Lock, LogIn, UserPlus, HelpCircle, MessageCircle, BookOpen } from "lucide-react";

export default function HeaderTop() {
  return (
    <div className="hidden lg:block bg-[#041379] border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo + Market */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-3xl font-heading font-bold text-white flex items-center gap-1"
            >
              Trade<span className="text-[#50fa7b]">Bro</span>
            </Link>

            {/* Market Card */}
            <div className="relative group">
              <div className="flex items-center gap-4 bg-white/10 px-5 py-2 rounded-lg border border-white/10">
                <Clock className="text-[#50fa7b]" />
                <div>
                  <span className="block text-[11px] uppercase text-slate-300 font-bold">Stock:</span>
                  <span className="block text-sm font-bold text-white">9.30 am to 4.00 pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portal */}
          <div className="relative group cursor-pointer flex items-center gap-3">
            <div className="text-[#50fa7b] bg-white/10 p-2.5 rounded-lg border border-white/10">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="text-white font-heading font-bold">My Portal</h3>
              <p className="text-xs text-slate-300 group-hover:text-[#50fa7b] transition">
                Login - or - Register
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
