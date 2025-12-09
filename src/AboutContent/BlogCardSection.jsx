import React from "react";
import { Calendar, Hash, ArrowRight, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Market Analysis",
    date: "15.09.2025",
    title: "How Global Events are Shaping Commodity Prices",
    excerpt: "Desire that they cannot foresee all the pain business it will frequently occur...",
    readTime: "4 Minutes read"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3184333/pexels-photo-3184333.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Economic News",
    date: "31.08.2025",
    title: "The Effect of Fiscal Policies on Stock Market Performance",
    excerpt: "Cases are perfectly simple to all distinguish desire that they cannot foresee...",
    readTime: "3 Minutes read"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/5980866/pexels-photo-5980866.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Learning Center",
    date: "23.08.2025",
    title: "Understanding Leverage: The Pros and Cons",
    excerpt: "Foresee the pain trouble that are in bound trouble that are bound to ensue...",
    readTime: "5 Minutes read"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Learning Center",
    date: "23.08.2025",
    title: "Understanding Leverage: The Pros and Cons",
    excerpt: "Foresee the pain trouble that are in bound trouble that are bound to ensue...",
    readTime: "5 Minutes read"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Market Analysis",
    date: "15.09.2025",
    title: "How Global Events are Shaping Commodity Prices",
    excerpt: "Desire that they cannot foresee all the pain business it will frequently occur...",
    readTime: "4 Minutes read"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/6802041/pexels-photo-6802041.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Economic News",
    date: "31.08.2025",
    title: "The Effect of Fiscal Policies on Stock Market Performance",
    excerpt: "Cases are perfectly simple to all distinguish desire that they cannot foresee...",
    readTime: "3 Minutes read"
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Economic News",
    date: "31.08.2025",
    title: "The Effect of Fiscal Policies on Stock Market Performance",
    excerpt: "Cases are perfectly simple to all distinguish desire that they cannot foresee...",
    readTime: "3 Minutes read"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/159888/monitor-binary-binary-system-internet-159888.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Learning Center",
    date: "23.08.2025",
    title: "Understanding Leverage: The Pros and Cons",
    excerpt: "Foresee the pain trouble that are in bound trouble that are bound to ensue...",
    readTime: "5 Minutes read"
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Market Analysis",
    date: "15.09.2025",
    title: "How Global Events are Shaping Commodity Prices",
    excerpt: "Desire that they cannot foresee all the pain business it will frequently occur...",
    readTime: "4 Minutes read"
  }
];

export default function BlogCardSection() {
  return (
    <section className="py-20 bg-white font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <div key={post.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Image Box */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Icon (Hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[#50fa7b] transition-colors">
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Top Box: Category & Date */}
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#50fa7b]">
                      <Hash size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{post.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title Box */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 leading-snug font-heading group-hover:text-[#50fa7b] transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Btn Box (Read Time / Read More Flip) */}
                <div className="mt-auto pt-4 border-t border-gray-100 relative h-6 overflow-hidden">
                  <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-6">
                    {/* Default State */}
                    <div className="h-6 flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {/* {post.readTime} <ArrowRight size={14} className="ml-2" /> */}
                    </div>
                    {/* Hover State */}
                    <div className="h-6 flex items-center text-xs font-bold text-[#50fa7b] uppercase tracking-wider">
                      Read More <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all">
            <ChevronLeft size={18} />
          </button>
          
          <button className="w-10 h-10 rounded-full bg-[#50fa7b] text-black font-bold flex items-center justify-center shadow-lg shadow-green-500/20">
            1
          </button>
          
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:border-[#50fa7b] hover:text-[#50fa7b] transition-all">
            2
          </button>
          
          <span className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">...</span>
          
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:border-[#50fa7b] hover:text-[#50fa7b] transition-all">
            3
          </button>
          
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
