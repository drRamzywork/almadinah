
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import Image from 'next/image';
import PalmTree from '@/svgs/PalmTree';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Alarm } from '@/svgs/Alarm';
import ArrowLeft from '@/svgs/ArrowLeft';

const ExploreSec = ({ topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic,
  dataStaticWords
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const router = useRouter();

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


  const desiredIds = [1, 13, 2];
  const filteredTopics = topics.filter(topic => desiredIds.includes(topic.id));


  const filteredDrobTopics = dataDrobTopic?.slice(0, 3);
  const filteredLandmarksTopic = dataLandmarksTopic?.slice(0, 3);
  const filteredFacilitiesTopic = dataFacilitiesTopic.slice(0, 3);

  const combinedTopics = filteredTopics.map((mainTopic, index) => {
    // Determine which subtopics array corresponds to the current main topic
    // This example assumes the order matches directly between the main topics and each set of filtered subtopics
    let subTopics;
    let imagePath;
    let iconSlide;

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
      case 13: // Assuming ID 13 corresponds to Facilities Topic
        subTopics = filteredFacilitiesTopic;
        imagePath = '/assets/images/Bage_middle.png';
        iconSlide = '/assets/svgs/Vector_icon.svg';



        break;
      default:
        subTopics = []; // Default to an empty array if no match is found
    }

    // Return a new object combining the main topic with its corresponding subtopics
    return {
      ...mainTopic,
      subTopics,
      imagePath,
      iconSlide
    };
  });

  const order = [2, 1, 13];

  // Rearrange combinedTopics based on the defined order
  const orderedCombinedTopics = order.map(id => combinedTopics.find(topic => topic.id === id));



  return (
    <section id='explore' className={styles.explore} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>

      <div className="container">
        <div className={`${styles.sec_title}  sec_title`}>
          <h3>استكشف المدينة المنورة</h3>

          <div className={styles.icon_container}>
            <Image width={208.76} height={209.51} src='/assets/svgs/Safe_Icon.svg' />
          </div>
        </div>
      </div>
      <div className={styles.boxes_container}>
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
                <img width={208.76} height={209.51} src={box?.imagePath} />
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
                {hoveredIndex === null || hoveredIndex === index ? (
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

                    className={`${styles.inner_boxes_container} d-flex`}>

                    {box?.subTopics?.map((subTopic, idx) =>
                      <Link href={`/${idx}`} className={styles.small_box}>
                        <div className={styles.img_container}>
                          <img src={subTopic.icon.includes(',') ? subTopic.icon.split(',')[0] : subTopic.icon} alt={subTopic.name} />
                        </div>

                        <div className={styles.hours_container}>
                          <p>
                            12 ساعة
                          </p>
                        </div>

                        <div className={styles.category_container}>
                          <div className={styles.category}>
                            <p>
                              12 ساعة
                            </p>
                          </div>
                          <div className={styles.icon_container}>
                            <PalmTree />
                          </div>
                        </div>

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
                    )}

                    <div className={styles.btn_container}>
                      <Link href={`/topic/${box.id}`}>
                        {` `}       {dataStaticWords.displayAll}    {` `}
                        {box.name}
                      </Link>

                      <div className={styles.arrow_container}>
                        <IoIosArrowBack />
                      </div>
                    </div>

                  </motion.div>}









              </div >
            </motion.div >


          </>
        ))
        }

      </div >



      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        id={styles.slider_container}>

        <Swiper
          slidesPerView={1.3}
          spaceBetween={16}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          className={styles.swiper_container}
        >
          {orderedCombinedTopics?.map((box, index) => (


            <SwiperSlide className={styles.slider}>

              <div className={styles.swiper_slide_box}>

                <div className={styles.background_image}>
                  <img width={208.76} height={209.51} src={box?.imagePath} />
                </div>
                <Link href={`/topic/${box.id}`} className={styles.arrow_container}>
                  <IoIosArrowBack />
                </Link>



                <div className={styles.topic_icon}>
                  <motion.img
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    width={208.76} height={209.51} src={box?.iconSlide} />

                </div>

                <div className={styles.title}>
                  <h5>{box?.name}</h5>
                </div>


                <div
                  className={styles.desc}>
                  <p>{box?.translatedDesc}</p>
                </div>

                {box?.subTopics?.map((subTopic, idx) =>
                  <Link href={`/${idx}`} className={styles.small_box}>
                    <div className={styles.img_container}>
                      <img src={subTopic.icon.includes(',') ? subTopic.icon.split(',')[0] : subTopic.icon} alt={subTopic.name} />
                    </div>
                    {console.log(subTopic, "subTopic")}
                    <div className={styles.text_container}>
                      <div className={styles.title}>
                        <p >
                          {subTopic.name}
                        </p>

                      </div>
                      {subTopic.tourHours !== null &&
                        <div className={styles.horus_container}>
                          <div className={styles.clock}>
                            <Alarm />
                          </div>
                          <p>h{subTopic.tourHours}</p>
                        </div>

                      }

                    </div>


                    <div className={styles.arrow_containerr}>
                      <ArrowLeft />
                    </div>


                  </Link>
                )}
              </div>

            </SwiperSlide>

          ))
          }
        </Swiper>
      </motion.div>


    </section >

  );
};

export default ExploreSec;
