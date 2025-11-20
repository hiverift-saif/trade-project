// src/pages/Programs.jsx
import React from 'react';
import Layout from './Layout';

function Programs() {
  return (
    <Layout pageTitle="Affiliate Programs">

    

          {/* Main Content */}
          <div className="p-6">
            <div className="space-y-6 ">
              <h1 className="text-3xl text-white font-semibold">Trade Pro Affiliate Program Terms and Conditions</h1>
              <div data-slot="card" className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800 p-8">
                <div data-slot="card-content" className="space-y-6 text-gray-300 text-sm">
                  <p>
                    The Trade Pro Affiliate Program is designed to reward individuals for promoting our trading platform. Affiliates can earn commissions by referring new traders to Trade Pro. This program is an excellent opportunity for anyone looking to generate additional income by simply sharing their positive experiences with our platform.
                  </p>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Commission Structure</h3>
                    <p>
                      Affiliates can earn up to 80% of the broker's trading commissions. This lucrative commission structure motivates affiliates to refer active traders, which in turn increases their potential earnings. The more active traders you bring on board, the higher your commission will be!
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">How to Join</h3>
                    <p className="mb-2">Joining the Trade Pro  Affiliate Program is simple. Follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Fill out the registration form available on our website.</li>
                      <li>Accept the terms and conditions of the program.</li>
                      <li>Receive your unique affiliate link and promotional materials.</li>
                      <li>Start promoting and earning commissions!</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Promotional Tools</h3>
                    <p className="mb-2">We provide a variety of marketing materials to help you succeed. These include:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Banners for your website or blog</li>
                      <li>Referral links to track your leads</li>
                      <li>Content suggestions for social media posts</li>
                    </ul>
                    <p className="mt-2">These tools are designed to maximize your potential for attracting new traders.</p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Support and Resources</h3>
                    <p className="mb-2">Our affiliates have access to a dedicated support team to assist with any questions or challenges. Additionally, we offer:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Frequently Asked Questions (FAQs)</li>
                      <li>Webinars and training sessions</li>
                      <li>Access to a community of affiliates</li>
                    </ul>
                    <p className="mt-2">We're committed to helping you succeed in your affiliate marketing journey!</p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Success Stories and Testimonials</h3>
                    <p className="mb-4">Read inspiring testimonials from our top-performing affiliates:</p>
                    <div className="space-y-4 bg-gray-800/30 p-4 rounded-lg">
                      <p className="italic text-gray-300">"Joining the Trade Pro Affiliate Program changed my life! I never thought I could earn this much by simply sharing a link!" - Jane D.</p>
                      <p className="italic text-gray-300">"The support I received was incredible. The tools provided made it easy to promote and succeed." - John S.</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Regulations and Compliance</h3>
                    <p>
                      Affiliates must adhere to our ethical marketing guidelines and comply with legal requirements. This ensures that we maintain the integrity of the Trade Pro brand and protect our community. Familiarize yourself with our compliance policy to ensure your marketing efforts align with our standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
    </Layout>
  );
}

export default Programs;
