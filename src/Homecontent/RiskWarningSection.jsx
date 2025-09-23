import React from "react";
import { TriangleAlert, Shield, Info, ExternalLink } from "lucide-react";

export default function RiskWarningSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-red-900/20 border-y border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-800/100 to-gray-900/100 rounded-2xl p-8 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                <TriangleAlert className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-yellow-400" />
                Risk Warning & Legal Compliance
              </h3>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                {/* Risk Disclosure */}
                <div className="bg-yellow-500/20 rounded-xl p-6 border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-400 mb-3 flex items-center">
                    <TriangleAlert className="w-5 h-5 mr-2" />
                    Risk Disclosure
                  </h4>
                  <p className="text-sm">
                    Trading financial instruments involves substantial risk of loss and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you could sustain a loss of some or all of your initial investment.{" "}
                    <strong className="text-yellow-300">You should not invest money that you cannot afford to lose.</strong>
                  </p>
                </div>

                {/* Legal Notice */}
                <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Legal Notice
                  </h4>
                  <p className="text-sm">
                    Trade Pro is a registered trading platform operating under strict regulatory compliance. Our services are not available to residents of certain jurisdictions including but not limited to the European Economic Area (EEA), United States of America (USA), Israel, United Kingdom (UK), and other restricted territories as per our Terms & Conditions.
                  </p>
                </div>

                {/* Important Notice */}
                <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Important Notice
                  </h4>
                  <p className="text-sm">
                    <strong className="text-purple-300">Past performance is not indicative of future results.</strong> All trading involves risk, and profits are not guaranteed. Please ensure you understand the risks involved and seek independent financial advice if necessary. Only invest capital you can afford to lose.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-700/50">
                {[
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Regulatory Information",
                  "Risk Management",
                ].map((label, idx) => (
                  <button
                    key={idx}
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
