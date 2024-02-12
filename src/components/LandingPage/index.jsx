import React, { useRef } from 'react'
import styles from './index.module.scss'
import HeaderSection from '../Home/HeaderSection'
import ExploreSec from '../Home/ExploreSec'
import Map from '../Home/Map'
import VirtualGuide from '../Home/VirtualGuide'



const LandingPage = () => {

  return (
    <>
      <HeaderSection />
      <ExploreSec />
      <Map />
      <VirtualGuide />
    </>
  )
}

export default LandingPage