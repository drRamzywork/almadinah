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
  industries,
  dir
}) => {
  const guidData = topics?.filter((topic) => topic.id === 4)[0].contents;

  return (
    <>
      <HeaderSection dir={dir} dataAllLangs={dataAllLangs} topics={topics} dataStaticWords={dataStaticWords} />
      <ExploreSec topics={topics}
        dataStaticWords={dataStaticWords}
        dataDrobTopic={dataDrobTopic}
        dataLandmarksTopic={dataLandmarksTopic}
        dataFacilitiesTopic={dataFacilitiesTopic}
        dir={dir}
      />
      <Map />
      <VirtualGuide
        dir={dir}
        guidData={guidData} dataStaticWords={dataStaticWords} />
      <Industries
        dir={dir}
        foods={foods}
        industries={industries}
        dataStaticWords={dataStaticWords}
      />

      <ShareMomentSec dir={dir} dataStaticWords={dataStaticWords} />
    </>
  )
}

export default LandingPage