
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import Image from 'next/image';
import PalmTree from '@/svgs/PalmTree';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Alarm } from '@/svgs/Alarm';
import ArrowLeft from '@/svgs/ArrowLeft';

const ExploreSec = ({ topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic,
  dataStaticWords,
  dir,
  taqweemAlmadinah
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);


  const boxVariants = {
    normal: {
      width: '500px',
      height: '800px',
      transition: { duration: 0.2 }
    },
    hovered: {
      width: '1880px',
      height: '800px',
      transition: { duration: 0.2 }
    },
  };

  const desiredIds = [1, 13, 2, 3];
  const filteredTopics = topics.filter(topic => desiredIds.includes(topic.id));

  const filteredDrobTopics = dataDrobTopic?.slice(0, 3);
  const filteredtaqweemAlmadinah = taqweemAlmadinah?.slice(0, 3);
  const filteredLandmarksTopic = dataLandmarksTopic?.slice(0, 3);
  const filteredFacilitiesTopic = dataFacilitiesTopic.slice(0, 3);


  const combinedTopics = filteredTopics.map((mainTopic, index) => {

    let subTopics;
    let imagePath;
    let iconSlide;
    console.log(mainTopic.id, "mainTopic.id")
    switch (mainTopic.id) {
      case 2: // Assuming ID 1 corresponds to Drob Topics
        subTopics = filteredDrobTopics;
        imagePath = '/assets/images/roads.png';
        iconSlide = '/assets/svgs/location_flag.svg';

        break;

      case 1: // Assuming ID 2 corresponds to Landmarks Topic
        subTopics = filteredLandmarksTopic;
        imagePath = '/assets/images/Bage_Left.png';
        iconSlide = '/assets/svgs/castle_icon_purble.svg';


        break;




      case 13:
        subTopics = filteredFacilitiesTopic;
        imagePath = '/assets/images/Bage_middle.png';
        iconSlide = '/assets/svgs/Vector_icon.svg';
        break;

      case 3:
        subTopics = filteredtaqweemAlmadinah;
        imagePath = '/assets/images/Bage_middle.png';
        iconSlide = '/assets/svgs/Vector_icon.svg';
        break;


      default:
        subTopics = [];
    }
    return {
      ...mainTopic,
      subTopics,
      imagePath,
      iconSlide
    };
  });

  const order = [2, 1, 13, 3];


  const orderedCombinedTopics = order.map(id => combinedTopics.find(topic => topic.id === id));



  return (
    <section id='explore' className={styles.explore} dir={dir}>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }} className="container">
        <div className={`${styles.sec_title}  sec_title`}>
          <h3>{dataStaticWords.discover} {dataStaticWords.siteName}</h3>

          <div className={styles.icon_container}>
            <Image width={208.76} height={209.51} src='/assets/svgs/Safe_Icon.svg' alt='safe icon' />
          </div>
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.boxes_container}>
        {orderedCombinedTopics?.map((box, index) => (
          <>
            <motion.div
              key={box?.id}
              className={styles.box}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={hoveredIndex === index ? 'hovered' : 'normal'}
              variants={boxVariants}
            >
              <div className={styles.background_image}>
                <img width={208.76} height={209.51} src={box?.imagePath} alt='icon' />
              </div>

              <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.icon_container}>
                <motion.img
                  initial={{ opacity: 0, }}
                  animate={{ opacity: 1, }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  width={208.76} height={209.51} src={box?.iconSlide} />
              </motion.div>

              <div className={styles.box_container}>
                {hoveredIndex === null || hoveredIndex === -1 || hoveredIndex === index ? (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.inner_container}
                  >

                    <div className={styles.text_container}>
                      <motion.div
                        className={styles.title}>
                        <h5>{box?.name}</h5>
                      </motion.div>
                      <div
                        className={styles.desc}>
                        <p>{box?.translatedDesc}</p>
                      </div>
                    </div>

                  </motion.div>
                ) :
                  ''
                }


                {hoveredIndex === index &&


                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}

                    className={`${styles.inner_boxes_container}`}>

                    <Swiper
                      slidesPerView={1.8}
                      pagination={{
                        clickable: true,
                      }}
                      className={styles.inner_boxes_container__swiper_container}
                      centeredSlides={false}
                      dir={dir}
                    >



                      {box?.subTopics?.map((subTopic, idx) =>
                        <SwiperSlide key={idx}>


                          <Link href={
                            subTopic.parentId === 2 ? `/topic-details/${subTopic.id}` :
                              subTopic.parentId === 3 ? `/details/${subTopic.id}` :
                                `/subdetails/${subTopic.id}`
                          }
                            className={styles.small_box}>
                            <div className={styles.img_container}>
                              <img src={subTopic.icon.includes(',') ? subTopic.icon.split(',')[0] : subTopic.icon} alt={subTopic.name} />
                            </div>

                            <div className={styles.hours_container}>
                              <p>
                                {subTopic.tourHours <= 1 && (`${subTopic.tourHours} ${dataStaticWords.hour} `)}
                                {subTopic.tourHours > 1 && (`${subTopic.tourHours} ${dataStaticWords.hours} `)}
                                {subTopic.totalMinutes && (`${subTopic.totalMinutes} ${dataStaticWords.minute} `)}
                              </p>
                            </div>

                            {/* <div className={styles.category_container}>
                          <div className={styles.category}>
                            <p>
                              12 ساعة
                            </p>
                          </div>
                          <div className={styles.icon_container}>
                            <PalmTree />
                          </div>
                        </div> */}

                            <div className={styles.card_bottom}>
                              <div className={styles.title}>
                                <p>
                                  {subTopic.name}
                                </p>

                              </div>

                              <div className={styles.icon_container}>
                                <FaArrowLeft />
                              </div>

                            </div>
                          </Link>
                        </SwiperSlide>

                      )}



                    </Swiper >

                    <div className={styles.btn_container}>
                      <Link href={`/topic/${box.id}`}>
                        {` `}       {dataStaticWords.displayAll}    {` `}
                        {box.name}
                      </Link>

                      <div className={styles.arrow_container}>
                        <IoIosArrowBack />
                      </div>
                    </div>

                  </motion.div>


                }

              </div >
            </motion.div >


          </>
        ))
        }
      </motion.div >

      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          id={styles.slider_container}>

          <Swiper
            slidesPerView={1.3}
            spaceBetween={26}
            pagination={{
              clickable: true,
            }}
            className={styles.swiper_container}
            centeredSlides={false}
            dir={dir}
          >
            {orderedCombinedTopics?.map((box, index) => (
              <SwiperSlide className={styles.slider} key={index}>
                <div className={styles.swiper_slide_box}>
                  <div className={styles.background_image}>
                    <img width={208.76} height={209.51} src={box?.imagePath} />
                  </div>

                  <Link href={`/topic/${box.id}`} className={styles.arrow_container}>
                    <IoIosArrowBack />
                  </Link>

                  <Link href={`/topic/${box.id}`} className={styles.topic_icon}>
                    <motion.img
                      initial={{ opacity: 0, }}
                      animate={{ opacity: 1, }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      width={208.76} height={209.51} src={box?.iconSlide} />

                  </Link>

                  <Link href={`/topic/${box.id}`} className={styles.title}>
                    <h5>{box?.name}</h5>
                  </Link>


                  <Link href={`/topic/${box.id}`} className={styles.desc}>
                    <p>{box?.translatedDesc}</p>
                  </Link>
                  {box?.subTopics?.map((subTopic, idx) =>
                    <Link href={
                      subTopic.parentId === 2 ? `/topic-details/${subTopic.id}` :
                        subTopic.parentId === 3 ? `/details/${subTopic.id}` :
                          `/subdetails/${subTopic.id}`
                    }
                      key={idx} className={styles.small_box}>
                      <div className={styles.img_container}>
                        <img src={subTopic.icon.includes(',') ? subTopic.icon.split(',')[0] : subTopic.icon} alt={subTopic.name} />


                        <div className={styles.text_container}>

                          {subTopic.tourHours !== null &&
                            <div className={styles.horus_container}>
                              <div className={styles.clock}>
                                <Alarm />
                              </div>
                              <p>
                                {subTopic.tourHours <= 1 && (`${subTopic.tourHours} ${dataStaticWords.hour} `)}
                                {subTopic.tourHours > 1 && (`${subTopic.tourHours} ${dataStaticWords.hours} `)}
                                {subTopic.totalMinutes && (`${subTopic.totalMinutes} ${dataStaticWords.minute} `)}
                              </p>
                            </div>

                          }

                        </div>

                      </div>
                      <div className={styles.title}>
                        <p >
                          {subTopic.name}
                        </p>


                        <div className={styles.arrow_containerr}>
                          <ArrowLeft />
                        </div>
                      </div>








                    </Link>
                  )}
                </div>

              </SwiperSlide>

            ))
            }
          </Swiper>
        </motion.div>
      </div>

    </section >

  );
};

export default ExploreSec;
