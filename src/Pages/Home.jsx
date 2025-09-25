import React from 'react'
import Herosection from "../Homecontent/Herosection"
import TrustedSection from '../Homecontent/TrustedSection'
import WhyChooseTradePro from '../Homecontent/WhyChooseTradePro'
import TradingFeatures from '../Homecontent/TradingFeatures'
import TradingLuck from '../Homecontent/TradingLuck'
import DownloadAccessibility from '../Homecontent/DownloadAccessibility'
import TestimonialSection from '../Homecontent/TestimonialSection'
import RiskWarningSection from '../Homecontent/RiskWarningSection'

const Home = () => {
  return (
    <div>
      <Herosection/>
      <TrustedSection/>
      <WhyChooseTradePro/>
      <TradingFeatures/>
      <TradingLuck/>
      <DownloadAccessibility/>
      <TestimonialSection/>
      <RiskWarningSection/>
    </div>
  )
}

export default Home
