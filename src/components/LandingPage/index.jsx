import React, { useRef } from 'react'
import styles from './index.module.scss'
import HeaderSection from '../Home/HeaderSection'
import ExploreSec from '../Home/ExploreSec'
import Map from '../Home/Map'
import VirtualGuide from '../Home/VirtualGuide'
import ShareMomentSec from '../Home/ShareMomentSec'



const LandingPage = () => {

  return (
    <>
      <HeaderSection />
      <ExploreSec />
      <Map />
      <VirtualGuide />
      <ShareMomentSec />
    </>
  )
}

export default LandingPage