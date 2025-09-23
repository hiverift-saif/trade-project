// src/components/BlogSection.jsx
import React from "react";
import { Calendar, MessageCircle, Bookmark } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Trading Strategies for Beginners",
    excerpt:
      "Learn the most effective trading strategies for beginners that can help you maximize profits while minimizing risks.",
    author: "John Doe",
    date: "Sep 20, 2025",
    comments: 12,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&w=600&q=80",
  },
  {
    id: 2,
    title: "Understanding Technical Analysis",
    excerpt:
      "Dive into technical analysis, charts, and indicators that professional traders use to make informed decisions.",
    author: "Maria Lopez",
    date: "Sep 18, 2025",
    comments: 8,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&w=600&q=80",
  },
  {
    id: 3,
    title: "How to Manage Trading Risk Effectively",
    excerpt:
      "Risk management is key to long-term trading success. Learn how to protect your capital and trade smartly.",
    author: "Lisa Wang",
    date: "Sep 15, 2025",
    comments: 5,
     image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&w=600&q=80",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-900 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Latest from Our Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments} Comments</span>
                  </div>
                </div>
                <div className="mt-4 text-gray-300 text-sm">
                  Author: {post.author}
                </div>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
