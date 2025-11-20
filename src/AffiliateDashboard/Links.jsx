import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Links() {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);  
 const [code, setCode] = useState("");
const [linksData, setLinksData] = useState([]);

useEffect(() => {
  const savedCode = localStorage.getItem("code");
  console.log("code from localStorage:", savedCode);
  setCode(savedCode || "");
}, []); // ✅ runs only once

// ✅ code update hone ke baad linksData set karo
useEffect(() => {
  if (!code) return; // jab tak code empty hai, wait

  setLinksData([
    {
      no: "1.",
      id: "#1405676",
      link: `http://localhost:5173/RefrelSignUp/${code}`,
      promoCode: code,
      comment: "-",
      type: "Register link",
      program: "Revenue Sharing",
      date: "2025-10-13",
    },
  ]);

}, [code]); // ✅ runs when `code` is loaded

   
  

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Layout pageTitle="Affiliate Links">
      <div className="space-y-6 relative">
    {copied && (
  <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 
                  bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg 
                  animate-fade-in-out w-[90%] max-w-[300px] text-center">
    ✅ Link copied successfully!
  </div>
)}


        <div className="rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    {["No", "ID", "Link", "Referral Code", "Comment", "Type", "Program", "Date", "Action"].map((h) => (
                      <th key={h} className="p-2 text-left text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {linksData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">{row.no}</td>
                      <td className="p-2 text-white">{row.id}</td>

                      {/* ✅ LINK CELL */}
                      <td className="p-2 text-blue-400">
                        <div className="flex items-center gap-2">
                          <a href={row.link} target="_blank" className="truncate max-w-[200px] hover:underline">
                            {row.link}
                          </a>
                          <button onClick={() => handleCopy(row.link)} className="p-1 text-gray-400 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      <td className="p-2 text-white">{row.promoCode}</td>
                      <td className="p-2 text-gray-400">{row.comment}</td>
                      <td className="p-2 text-white">{row.type}</td>
                      <td className="p-2 text-white">{row.program}</td>
                      <td className="p-2 text-white">{row.date}</td>

                      {/* ✅ ACTION BUTTON */}
                      <td className="p-2">
                        <button
                          onClick={() => openLink(row.link)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInOut {
            0%,100% { opacity: 0; transform: translateY(-10px); }
            10%,90% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-out {
            animation: fadeInOut 2s ease-in-out;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export default Links;
