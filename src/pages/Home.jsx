import React from 'react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import CarList from '../components/CarList/CarList'
import Testimonial from '../components/Testimonial/Testimonial'
import AppStoreBanner from '../components/AppStoreBanner/AppStoreBanner'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import CarBookingForm from '../components/Booking'

const Home = ({theme}) => {
  return (
    <div>
      <Hero theme={theme} />
      <CarBookingForm/>
      <Services />
      {/* <CarList /> */}
      <Testimonial />
      <About />
      <AppStoreBanner />
      <Contact />
    </div>
  )
}

export default Home
