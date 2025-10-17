// import React, { useState } from 'react';
// import Layout from '../AffiliateDashboard/Layout';

// function AffiliatePrograms() {
//   return (
//     <Layout pageTitle="Affiliate Programs">
//       <div className="space-y-6 max-w-[1380px]">
//         <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-8">
//           <div className="space-y-6 text-gray-300 text-sm">
//             <p>
//               The Trade Pro Affiliate Program is designed to reward individuals for promoting our trading platform. Affiliates can earn commissions by referring new traders to Trade Pro. This program is an excellent opportunity for anyone looking to generate additional income by simply sharing their positive experiences with our platform.
//             </p>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Commission Structure</h3>
//               <p>
//                 Affiliates can earn up to 80% of the broker's trading commissions. This lucrative commission structure motivates affiliates to refer active traders, which in turn increases their potential earnings. The more active traders you bring on board, the higher your commission will be!
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">How to Join</h3>
//               <p className="mb-2">Joining the Trade Pro Affiliate Program is simple. Follow these steps:</p>
//               <ol className="list-decimal list-inside space-y-2 pl-4">
//                 <li>Fill out the registration form available on our website.</li>
//                 <li>Accept the terms and conditions of the program.</li>
//                 <li>Receive your unique affiliate link and promotional materials.</li>
//                 <li>Start promoting and earning commissions!</li>
//               </ol>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Promotional Tools</h3>
//               <p className="mb-2">We provide a variety of marketing materials to help you succeed. These include:</p>
//               <ul className="list-disc list-inside space-y-2 pl-4">
//                 <li>Banners for your website or blog</li>
//                 <li>Referral links to track your leads</li>
//                 <li>Content suggestions for social media posts</li>
//               </ul>
//               <p className="mt-2">These tools are designed to maximize your potential for attracting new traders.</p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Support and Resources</h3>
//               <p className="mb-2">Our affiliates have access to a dedicated support team to assist with any questions or challenges. Additionally, we offer:</p>
//               <ul className="list-disc list-inside space-y-2 pl-4">
//                 <li>Frequently Asked Questions (FAQs)</li>
//                 <li>Webinars and training sessions</li>
//                 <li>Access to a community of affiliates</li>
//               </ul>
//               <p className="mt-2">We're committed to helping you succeed in your affiliate marketing journey!</p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Success Stories and Testimonials</h3>
//               <p className="mb-4">Read inspiring testimonials from our top-performing affiliates:</p>
//               <div className="space-y-4 bg-gray-800/30 p-4 rounded-lg">
//                 <p className="italic text-gray-300">"Joining the Trade Pro Affiliate Program changed my life! I never thought I could earn this much by simply sharing a link!" - Jane D.</p>
//                 <p className="italic text-gray-300">"The support I received was incredible. The tools provided made it easy to promote and succeed." - John S.</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Regulations and Compliance</h3>
//               <p>
//                 Affiliates must adhere to our ethical marketing guidelines and comply with legal requirements. This ensures that we maintain the integrity of the Trade Pro brand and protect our community. Familiarize yourself with our compliance policy to ensure your marketing efforts align with our standards.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AffiliatePrograms;
















// src/components/AffiliatePage.jsx
import React, { useState } from 'react';
import {
  Users,
  FileText,
  Link2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Headphones,
  Globe,
  Star,
  ChevronDown,
  ArrowRight,
  Calculator,
  MessageCircle,
} from 'lucide-react';

function AffiliatePage() {
  // Data for sections
  const stepsData = [
    {
      number: 1,
      icon: FileText,
      title: 'STEP 1 — Apply',
      description: 'Fill out a quick application form — it only takes a few minutes. Our team will review and get back to you within 1–2 business days.',
    },
    {
      number: 2,
      icon: Link2,
      title: 'STEP 2 — Connect',
      description: 'Once approved, share your unique affiliate link across your favorite platforms, communities, or websites.',
    },
    {
      number: 3,
      icon: DollarSign,
      title: 'STEP 3 — Earn',
      description: 'Earn commissions for every successful referral that joins and trades through your link. We offer high commission rates and on-time payouts every week.',
    },
  ];

  const benefitsData = [
    {
      icon: TrendingUp,
      title: 'High Commission Rates',
      description: 'Earn top-tier commissions for every active referral.',
    },
    {
      icon: CreditCard,
      title: 'Weekly Payouts',
      description: 'Receive your payments securely every week — no long waits.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Our affiliate success team is available to help you maximize your results.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Promote to traders worldwide — TradePro supports clients across multiple regions and languages.',
    },
  ];

  const testimonialsData = [
    {
      quote: "TradePro's affiliate system is transparent, easy to use, and rewarding. Their weekly payouts keep the cash flow strong!",
      author: 'Sarah L.',
      title: 'Financial Blogger',
    },
    {
      quote: "The best affiliate dashboard I've used. Real-time stats, clear commission tracking, and instant support.",
      author: 'Ryan T.',
      title: 'YouTuber & Trading Coach',
    },
  ];

  const faqsData = [
    {
      question: 'How can I reset my password?',
      answer: 'Visit the Affiliate Dashboard login page and click "Forgot Password" to receive a password reset email.',
    },
    {
      question: 'When do affiliates get paid?',
      answer: 'Affiliates receive secure payments every week, ensuring no long delays.',
    },
    {
      question: 'How do I track my performance?',
      answer: 'Track your performance via the Affiliate Dashboard, which offers real-time stats and commission tracking.',
    },
  ];

  const resourcesData = [
    {
      icon: FileText,
      title: 'Blog',
      description: 'Stay updated with the latest trading insights and company announcements.',
      link: '/blog',
    },
    {
      icon: Calculator,
      title: 'Fees & Charges',
      description: 'Review our transparent trading, deposit, and withdrawal fee structures.',
      link: '/fees',
    },
    {
      icon: MessageCircle,
      title: '24/7 Chat Support',
      description: 'Our support desk is available 24/7 — including weekends — for any affiliate or trading-related queries.',
      link: '/support',
    },
  ];

  // FAQ accordion state
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Maximize Your Earnings with Our Affiliate Program
            </h1>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: 'Calling all publishers, creators, and finance influencers!<br>Join the TradePro Affiliate Program to monetize your audience and connect with a growing network of active traders and investors.',
              }}
            />
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-3 mt-8">
              <Users className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <span className="text-white">
                Join over <span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">2,500+ Affiliates</span> who are earning more with TradePro today!
              </span>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 mb-3">Already an affiliate?</p>
              <a
                href="/AffiliateLogin"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 border bg-background hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 border-blue-500/50 text-white hover:bg-blue-500/10 hover:border-blue-500"
              >
                Login to Affiliate Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">How Does It Work?</h2>
            <p className="text-gray-400 text-lg">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsData.map((step) => (
              <div
                key={step.number}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="p-8">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 group-hover:border-gray-600 transition-colors">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">{step.number}</span>
                    </div>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${
                        step.number === 1 ? 'from-blue-500 to-cyan-500' : step.number === 2 ? 'from-purple-500 to-pink-500' : 'from-green-500 to-emerald-500'
                      } shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl text-white">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Why Choose TradePro's Affiliate Program?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="space-y-4">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${
                        index === 0
                          ? 'from-blue-500 to-cyan-500'
                          : index === 1
                          ? 'from-green-500 to-emerald-500'
                          : index === 2
                          ? 'from-purple-500 to-pink-500'
                          : 'from-orange-500 to-red-500'
                      } shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <Star className="w-6 h-6 text-green-400" aria-hidden="true" />
                    <h3 className="text-xl text-white">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">What Our Affiliates Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.author}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gradient-to-br from-gray-900/90 to-gray-800/50 border-gray-700 backdrop-blur-sm"
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-white">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-900/50 border border-gray-800 rounded-lg px-6 backdrop-blur-sm"
              >
                <button
                  className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 text-white hover:text-blue-400 text-left"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <span className="font-medium">{`Q: ${faq.question}`}</span>
                  <ChevronDown
                    className={`text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  id={`faq-${index}`}
                  className={`text-sm text-gray-300 overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-40 py-4' : 'max-h-0'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20 backdrop-blur-sm">
            <div className="p-12 text-center">
              <h2 className="text-3xl sm:text-4xl text-white mb-4">Join the TradePro Affiliate Program Today!</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Start earning more by sharing TradePro's powerful trading platform with your audience. Sign up today and unlock your earning potential with industry-leading commissions.
              </p>
              <a
                href="/AffiliateSignup"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Sign Up Now
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section> 

      {/* Resources Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Additional Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourcesData.map((resource, index) => (
              <div
                key={resource.title}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-8">
                  <div className="text-center space-y-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${
                        index === 0 ? 'from-blue-500 to-indigo-500' : index === 1 ? 'from-green-500 to-teal-500' : 'from-purple-500 to-pink-500'
                      } shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <resource.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl text-white">{resource.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{resource.description}</p>
                    <div className="pt-2">
                      <ArrowRight className="w-5 h-5 text-blue-400 mx-auto group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AffiliatePage;