import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import StatsFeaturedSection from '../components/StatsFeaturedSection'
import Home3rdSection from '../components/Home3rdSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Header></Header>
      <HeroSection></HeroSection>
      <StatsFeaturedSection></StatsFeaturedSection>
      <Home3rdSection></Home3rdSection>
      <Footer></Footer>
    </div>
  )
}
