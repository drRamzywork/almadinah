import React, { useRef } from 'react'
import styles from './index.module.scss'
import HeaderSection from '../Home/HeaderSection'
import ExploreSec from '../Home/ExploreSec'
import Map from '../Home/Map'
import VirtualGuide from '../Home/VirtualGuide'
import ShareMomentSec from '../Home/ShareMomentSec'
import Industries from '../Home/Industries'



const LandingPage = ({ topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic,
  dataStaticWords,
  dataAllLangs,
  foods,
  industries


}) => {
  const guidData = topics?.filter((topic) => topic.id === 4)[0].contents;

  return (
    <>
      <HeaderSection dataAllLangs={dataAllLangs} topics={topics} />
      <ExploreSec topics={topics}
        dataStaticWords={dataStaticWords}
        dataDrobTopic={dataDrobTopic}
        dataLandmarksTopic={dataLandmarksTopic}
        dataFacilitiesTopic={dataFacilitiesTopic}
      />
      <Map />
      <VirtualGuide guidData={guidData} />
      <Industries
        foods={foods}
        industries={industries}
        dataStaticWords={dataStaticWords}
      />

      <ShareMomentSec />
    </>
  )
}

export default LandingPage