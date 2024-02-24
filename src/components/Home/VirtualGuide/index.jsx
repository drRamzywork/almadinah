import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';


// import required modules

const VirtualGuide = ({ guidData }) => {
  const router = useRouter();
  const [currentVideoSrc, setCurrentVideoSrc] = useState("https://almadinah.io/Areas/07122023501009265.mp4");
  const [activeVideoId, setActiveVideoId] = useState(null);

  function chunkArray(myArray, chunkSize) {
    const results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
    }
    return results;
  }


  const handleSlideClick = (videoUrl, videoId) => {
    setActiveVideoId(videoId)
    setCurrentVideoSrc(videoUrl);

  };


  useEffect(() => {
    const videoElement = document.querySelector('video'); // Adjust the selector if needed

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

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentVideoSrc]); // Empty dependency array means this effect runs once on mount



  return (
    <>
      <section id='virtual_guide' className={styles.virtual_guide} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className={styles.shape}>
          <Image src='/assets/images/shape_BG.png' width={868} height={463} />
        </div>
        <div className="container">

          <div className={styles.sec_container}>

            <div className={styles.topics_container}>
              <div className={styles.shadow} />
              <div className={styles.guide}>
                <p>مرشدك الافتراضي</p>
              </div>
              <div className={`${styles.sec_title} sec_title`}>
                <h3>ماذا تريد أن تعرف عنه؟</h3>
              </div>

              <div id="vertical_swiper">
                <div className={styles.boxes_container}>

                  <Swiper
                    direction={'vertical'}
                    pagination={{
                      clickable: true,
                    }}
                    slidesPerView={2.3}
                    spaceBetween={16}

                    className={styles.swiper_container}
                  >
                    {
                      chunkArray([...guidData], 2).map((pair, index) => (
                        <SwiperSlide
                          className={styles.swiper_slide_box} key={index}>
                          <div className="d-flex ">
                            {pair.map((topic) => (
                              <div
                                onClick={() => handleSlideClick(topic.tourGuide, topic.id)}
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
                  dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
                  className={styles.swiper}
                >
                  {
                    guidData.map((topic, index) => (
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
                  muted
                  loop
                  autoPlay
                  controls
                >
                  <source src={currentVideoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className={`${styles.sec_title} sec_title`}>
                <p>مرشدك الافتراضي</p>
                <h3>ماذا تريد أن تعرف عنه؟</h3>
              </div>

            </div>



          </div>
        </div>




        <div className={styles.shadow} />
      </section>

    </>

  )
}

export default VirtualGuide