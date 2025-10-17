import React from 'react';
import Layout from './Layout';
import { Copy } from 'lucide-react';

function Links() {
  const linksData = [
    {
      no: '1.',
      id: '#1405676',
      link: 'https://www..com/signup?lid=1405676',
      promoCode: '1405676',
      comment: '-',
      type: 'Register link',
      program: 'Revenue Sharing',
      date: '2025-10-13',
    },
  ];

  return (
    <Layout pageTitle="Affiliate Links">
      <div className="space-y-6">
        <div className="rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    {['No', 'ID', 'Link', 'Promo code', 'Comment', 'Type', 'Program', 'Date', 'Action'].map((header) => (
                      <th key={header} className="p-2 text-left text-gray-400 font-medium">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {linksData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">{row.no}</td>
                      <td className="p-2 text-white">{row.id}</td>
                      <td className="p-2 text-blue-400">
                        <div className="flex items-center space-x-2">
                          <span className="truncate max-w-[200px] sm:max-w-sm">{row.link}</span>
                          <button
                            className="p-1 text-gray-400 hover:text-white"
                            onClick={() => navigator.clipboard.writeText(row.link)}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-white">{row.promoCode}</td>
                      <td className="p-2 text-gray-400">{row.comment}</td>
                      <td className="p-2 text-white">{row.type}</td>
                      <td className="p-2 text-white">{row.program}</td>
                      <td className="p-2 text-white">{row.date}</td>
                      <td className="p-2">
                        <a
                          href={row.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center p-1 border border-gray-700 rounded-md text-white hover:bg-gray-700/50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-external-link"
                          >
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14 21 3"></path>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Links;