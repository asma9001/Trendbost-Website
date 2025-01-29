import React from 'react'
import Header from '../components/Header/Header'
import Main from '../components/main/Main'
import AboutUs from '../components/AboutUs/AboutUs'
import WhoWorks from '../components/whoWorks/WhoWorks'
import Features from '../components/Features/Features'
import Questions from '../components/Questions/Questions'
import ContactUs from '../components/ContactUs/ContactUs'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Main />
      <AboutUs />
      <WhoWorks />
      <Features />
      <Questions />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
