import React, { useState } from 'react';
import { FileText, CheckCircle, Shield, Scale, Users, Lock, Sparkles } from 'lucide-react';

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(null);

  const advantages = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Clarity",
      description: "Terms and Conditions agreements provide clarity about what should occur in any given circumstance. They set out the essential business terms you are offering to your customers and help contractual parties to understand their rights, obligations, functions, and accountabilities."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "A Comprehensive System",
      description: "Your Terms and Conditions agreement produces a well-organized and comprehensive system by covering commercial terms such as delivery, price, payment, and other areas often overlooked by businesses. They also proceed to limit your liability, disclaiming your liability for failure or delay caused by inevitable circumstances, therefore protecting your intellectual property rights."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Conformity with Laws",
      description: "There may be specific regulations that apply to your industry, and you may refer to them in your Terms and Conditions. Having a defined Terms and Conditions agreement helps ensure conformity with applicable laws."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Confidence and Consistency",
      description: "Having a clear set of Terms and Conditions helps you deliver a consistently excellent level of customer service while avoiding any ambiguity. By doing this, customer's expectations are well-managed regarding delivery and payment, therefore eliminating disappointments in your provision of services."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Assurance",
      description: "If you have a clear set of Terms and Conditions, it is considerably easier to spot a breach of contract. Written contracts provide assurance and are easier to enforce whenever required. Having a comprehensive set of Terms and Conditions also helps minimize the probability of getting a legal dispute. It is more prudent to have a Terms and Conditions agreement prepared than be involved in prolonged and expensive litigation."
    }
  ];

  const keyPoints = [
    "A complete and well-detailed Terms and Conditions agreement minimizes the risks of getting legal disputes.",
    "The consent of users ensures your Terms and Conditions agreement is enforceable.",
    "Using simple, plain language in your Terms and Conditions agreement comes with benefits.",
    "Your Terms and Conditions agreement should be easy to locate and displayed in various areas of your website or app.",
    "Having a solid Terms and Conditions agreement with appropriate consent allows you to enforce your regulation and guidelines whenever required."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 max-w-6xl relative">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Scale className="w-16 h-16 text-blue-400" />
              <Sparkles className="w-6 h-6 text-blue-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto">
            A legally binding contract between your business and customers that protects both parties
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-8xl">
        {/* Introduction */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 mb-12 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">What are Terms and Conditions?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-blue-400">Terms and Conditions agreements</strong> serve as a legally binding contract between you (the business) who manages a mobile application or a website and the customer who uses your app or visits your website.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            They are otherwise called <strong className="text-blue-400">Terms of Use</strong> or <strong className="text-blue-400">Terms of Service</strong> agreements and are shortened as <strong className="text-blue-400">T&Cs</strong> (or <strong className="text-blue-400">ToU</strong> and <strong className="text-blue-400">ToS</strong>, respectively).
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            No two businesses are identical, and as such, every business needs a unique T&C agreement designed to meet its specific needs. While some clauses are conventional and usually seen in basically every Terms and Conditions agreement, you ultimately decide what regulations and guidelines your customers must accept.
          </p>
          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6 backdrop-blur-sm">
            <p className="text-gray-200">
              Although employing a Terms and Conditions agreement is <strong className="text-blue-400">fully optional</strong> as there are <strong className="text-blue-400">no laws</strong> that necessitate it, this agreement is <strong className="text-blue-400">highly recommended</strong> by experts and presents lots of benefits for both your company and customers.
            </p>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Advantages of Having a Terms and Conditions Agreement
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-blue-500/20"
                onClick={() => setActiveSection(activeSection === index ? null : index)}
              >
                <div className="flex items-start">
                  <div className="bg-blue-500/20 text-blue-400 p-3 rounded-lg mr-4 flex-shrink-0 border border-blue-500/30">
                    {advantage.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-3">{advantage.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clauses Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 mb-12 border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-6">Essential Clauses to Include</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Terms and Conditions are considerably broad in the abstract sense. However, as businesses differ, they require some specific clauses that are exclusive only to their form of business, depending on:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50 backdrop-blur-sm">
              <p className="font-semibold text-gray-200">The size of the contract</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50 backdrop-blur-sm">
              <p className="font-semibold text-gray-200">The complexity of the agreement</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50 backdrop-blur-sm">
              <p className="font-semibold text-gray-200">The industry</p>
            </div>
          </div>
          
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-start">
              <Lock className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">Intellectual Property Clause</h3>
                <p className="text-gray-300 leading-relaxed">
                  This clause is a provision where you, the business owner or inventor, retains ownership of your patents, copyrights, trademarks, trade dresses, or trade secrets. Intellectual property security is crucial to promoting innovation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-6">Summary</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            A reliable Terms and Conditions agreement lets your users know what they can expect from your business and what is expected from them. It formulates a contract between your business and the end-user as well as helps protect your business from potential legal problems.
          </p>
          <h3 className="text-xl font-semibold text-white mb-4">Important Points to Note:</h3>
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-2xl p-8 text-center border border-blue-400/20">
          <h3 className="text-2xl font-bold mb-4 text-white">Ready to Create Your Terms and Conditions?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Protect your business and build trust with your customers by implementing a comprehensive Terms and Conditions agreement today.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div> */}
      </div>
    </div>
  );
}