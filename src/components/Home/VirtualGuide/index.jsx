import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IoIosClose } from 'react-icons/io';
import { Mousewheel, Pagination, Scrollbar, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';


const VirtualGuide = ({ guidData, dataStaticWords, dir, defaultVideoSrc }) => {
  const router = useRouter();
  const [currentVideoSrc, setCurrentVideoSrc] = useState(defaultVideoSrc);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [topic, setTopic] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const sectionRef = useRef(null);

  function chunkArray(myArray, chunkSize) {
    const results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
    }
    return results;
  }


  const handleSlideClick = (videoUrl, videoId, topicName) => {
    setShowGuide(true)
    setActiveVideoId(videoId)
    setCurrentVideoSrc(videoUrl);
    setTopic(topicName);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      // Autoplay and unmute the video if the section is intersecting (in view)
      setAutoPlay(entry.isIntersecting);
    }, {
      root: null,
      threshold: 0.1,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);



  useEffect(() => {
    const video = document.querySelector('video');
    if (!video) return;

    if (autoPlay) {
      video.muted = false; // Unmute when the video is supposed to autoplay
      video.play().catch(err => console.error("Error playing the video:", err));
    } else {
      video.muted = true; // Optional: Mute when not in view or not autoplaying
    }
  }, [autoPlay, currentVideoSrc]); // React to changes in autoplay state and source




  useEffect(() => {
    const videoElement = document.querySelector('video');


    const handleScroll = async () => {
      if (document.pictureInPictureElement) {

        return; // Do nothing if already in PiP mode
      }

      try {
        if (videoElement && !videoElement.paused && document.pictureInPictureEnabled && !document.pictureInPictureElement) {
          await videoElement.requestPictureInPicture();
        }
      } catch (error) {
        console.error('Error trying to toggle Picture-in-Picture mode:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentVideoSrc]);


  return (
    <>
      <section ref={sectionRef} id='virtual_guide' className={`${styles.virtual_guide} ${router.pathname.includes('/virtual-guide') ? styles.virtualPage : ''}`} dir={dir} >
        <div className={styles.shape}>
          <Image src='/assets/images/shape_BG.png' width={868} height={463} />
        </div>

        <div className="container">

          <div className={styles.sec_container}>
            <div className={styles.topics_container}>
              <div className={styles.shadow} />
              <div className={styles.guide}>
                <p>{dataStaticWords.guideVirtual}</p>
              </div>
              <Link href={`/virtual-guide`} className={`${styles.sec_title}   sec_title`}>

                {router.pathname.includes('/virtual-guide')
                  ?
                  < h3 className='pb-3'> {dataStaticWords.choseLandMark}</h3>
                  :
                  <h3>{dataStaticWords.needToKnow}</h3>

                }
              </Link>

              <div id="vertical_swiper">
                <div className={styles.boxes_container}>

                  <Swiper
                    direction={'vertical'}
                    pagination={{
                      clickable: true,
                    }}
                    slidesPerView={2.3}
                    spaceBetween={16}


                    modules={[Mousewheel, FreeMode]}
                    freeMode={true}

                    className={styles.swiper_container}
                  >
                    {
                      chunkArray([...guidData], 2).map((pair, index) => (
                        <SwiperSlide
                          className={styles.swiper_slide_box} key={index}>
                          <div className="d-flex ">
                            {pair.map((topic) => (
                              <div
                                onClick={() => handleSlideClick(topic.tourGuide, topic.id, topic.name)}
                                className={`${styles.box} ${activeVideoId === topic.id ? styles.active : ''}`} key={topic.id}>
                                <div className={styles.img_container}>
                                  <Image src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} width={233} height={166} />
                                </div>
                                <div className={styles.title}>
                                  <h5>{topic.name}</h5> {/* Assuming each topic has a name */}
                                  <div className={styles.icon_container}>
                                    <Image src={'/assets/svgs/guide_icon.svg'} width={233} height={166} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </SwiperSlide>
                      ))
                    }







                  </Swiper>



                </div>
              </div>

              <div className={styles.mobile_Slider}>
                <Swiper
                  slidesPerView={2.2}
                  // spaceBetween={16}
                  centeredSlides={false}
                  pagination={{
                    clickable: true,
                  }}
                  dir={dir}
                  className={styles.swiper}
                >
                  {
                    guidData?.map((topic, index) => (
                      <SwiperSlide
                        className={styles.swiper_slide_box} key={index}>
                        <div
                          onClick={() => handleSlideClick(topic.tourGuide, topic.id)}
                          className={`${styles.box} ${activeVideoId === topic.id ? styles.active : ''}`} >
                          <div className={styles.img_container}>
                            <Image src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} width={233} height={166} />
                          </div>
                          <div className={styles.title}>
                            <h5>{topic.name}</h5>
                            <div className={styles.icon_container}>
                              <Image src={'/assets/svgs/guide_icon.svg'} width={233} height={166} />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  }







                </Swiper>
              </div>
            </div>


            <div className={styles.video_container}>
              <div className={styles.img_container}>
                <img src="/assets/images/Background_hands_web.png" alt="" />
                <video
                  key={currentVideoSrc}
                  muted={!autoPlay}
                  autoPlay={autoPlay}
                  controls
                >
                  <source src={currentVideoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <Link href={`/virtual-guide`} className={`${styles.sec_title} sec_title`}>
                <p>{dataStaticWords.guideVirtual}</p>


                {router.pathname.includes('/virtual-guide')
                  ?
                  < h3 className='pb-3'> {dataStaticWords.choseLandMark}</h3>
                  :
                  <h3>{dataStaticWords.needToKnow}</h3>

                }
              </Link>

            </div>

          </div>

        </div>

        <div className={styles.shadow} />
      </section >


      {router.pathname === '/virtual-guide' &&
        showGuide &&
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}

          className={styles.video_layer} dir={dir}>
          <div className="container">
            <div className={styles.title}>
              <p>{dataStaticWords.guideVirtual}</p>
              <div className={styles.close_icon} onClick={() => {
                setCurrentVideoSrc('')
                setShowGuide(false)
              }}>
                <IoIosClose />
              </div>
            </div>
            <div className="sec_title">
              <h3 >{topic}</h3>
            </div>
          </div>

          <div className={styles.video_container}>
            <video
              key={currentVideoSrc}
              muted={!autoPlay}
              autoPlay={false}
              controls
            >

              <source src={currentVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      }

    </>

  )
}

export default VirtualGuide