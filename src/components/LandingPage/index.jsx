import React, { useRef } from 'react'
import styles from './index.module.scss'
import HeaderSection from '../Home/HeaderSection'
import ExploreSec from '../Home/ExploreSec'
import Map from '../Home/Map'
import VirtualGuide from '../Home/VirtualGuide'
import ShareMomentSec from '../Home/ShareMomentSec'



const LandingPage = ({ topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic


}) => {

  return (
    <>
      <HeaderSection />
      <ExploreSec topics={topics}
        dataDrobTopic={dataDrobTopic}
        dataLandmarksTopic={dataLandmarksTopic}
        dataFacilitiesTopic={dataFacilitiesTopic}
      />
      <Map />
      <VirtualGuide />
      <ShareMomentSec />
    </>
  )
}

export default LandingPage