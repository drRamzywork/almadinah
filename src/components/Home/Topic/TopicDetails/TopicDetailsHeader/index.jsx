// import React, { useState } from 'react';
// import styles from './index.module.scss';
// import { useRouter } from 'next/router';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Image from 'next/image';
// import { FaLocationDot } from "react-icons/fa6";
// import { Alarm } from '@/svgs/Alarm';
// import Link from 'next/link'
// import Microphone from '@/svgs/Microphone'
// import Guide from '@/svgs/Guide'
// import { motion } from 'framer-motion';

// const TopicDetailsHeader = ({ dataContentDetails }) => {
//   const [Step, setStep] = useState(0);

//   const router = useRouter();
//   const features = currentContent.relatedFeatures;
//   const stepsData = currentContent.drobSteps;
//   console.log(stepsData, "dataContentDetails")




//   // SWIPER LOGIC
//   const handleScroll = (event) => {
//     const delta = Math.sign(event.deltaY);
//     if (delta > 0) {
//       // Scroll down
//       // Trigger Swiper to slide to the next slide
//       // You can use Swiper API to control the slider
//     } else if (delta < 0) {
//       // Scroll up
//       // You can handle sliding to the previous slide if needed
//     }
//   };

//   // SWIPER LOGIC

//   return (

//     <>
//       <header id='topic_details_header' className={styles.topic_details_header}>
//         <div className="container">
//           <div className="sec_container">

//             <div className="swiper_container">
//               {dataContentDetails.guideDescList !== null &&
//                 <div className={styles.icons_container}>
//                   <Link href={'#'} className={styles.icon}>
//                     <Microphone />
//                     <p className={styles.guide}>
//                       التسجيل الصوتي
//                     </p>
//                   </Link>

//                   <Link href={'#'} className={styles.icon}>
//                     <Guide />
//                     <p className={styles.guide}>
//                       المرشد الافتراضي
//                     </p>
//                   </Link>


//                 </div>
//               }

//               <div className="hours">
//                 <div className="icon_container">
//                   <Alarm />
//                 </div>

//               </div>


//               <Swiper
//                 direction={'vertical'}
//                 pagination={{
//                   clickable: true,
//                 }}
//                 slidesPerView={2.3}
//                 spaceBetween={16}

//                 className={styles.swiper_container}
//               >
//                 <SwiperSlide
//                   className={styles.swiper_slide_box} >
//                   <div className={styles.img_container}>
//                     <Image src={'/assets/images/place.png'} width={233} height={166} />
//                   </div>
//                 </SwiperSlide>
//                 <SwiperSlide
//                   className={styles.swiper_slide_box} >
//                   <div className={styles.img_container}>
//                     <Image src={'/assets/images/place.png'} width={233} height={166} />
//                   </div>
//                 </SwiperSlide>
//                 <SwiperSlide
//                   className={styles.swiper_slide_box} >
//                   <div className={styles.img_container}>
//                     <Image src={'/assets/images/place.png'} width={233} height={166} />
//                   </div>
//                 </SwiperSlide>








//               </Swiper>





//             </div>

//             <div className="details_container">

//               <div className="title">
//                 <h2>{dataContentDetails.name}</h2>

//               </div>



//               <div className="steps_container">






//                 <Swiper direction={'vertical'}
//                   pagination={{
//                     clickable: true,
//                   }}
//                   slidesPerView={1}
//                   spaceBetween={16}

//                   className={styles.swiper_container}

//                 >
//                   <SwiperSlide>
//                     <motion.div
//                       initial={{ opacity: 0, y: -50 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5 }}
//                       className={styles.slideContent}
//                     >




//                     </motion.div>
//                   </SwiperSlide>
//                   {stepsData.map(step => (
//                     <SwiperSlide >
//                       <motion.div
//                         initial={{ opacity: 0, y: -50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className={styles.slideContent}
//                       >
//                         <div key={step.id}>
//                           <h2>{step.name}</h2>
//                           <p>{step.placeDescription}</p>
//                           <p>Duration: {step.totalMinutes} minutes</p>
//                           <p>Link: {step.link}</p>
//                           <img src={step.image} alt={step.name} />
//                         </div>

//                       </motion.div>
//                     </SwiperSlide>
//                   ))}
//                   {/* Add more SwiperSlides for additional slides */}
//                 </Swiper>

//               </div>





//             </div>
//           </div>

//         </div>

//       </header>






//       {/* <motion.div className={styles.sliderContainer} onWheel={handleScroll}>

//       </motion.div>
//  */}

//     </>
//   )
// }

// export default TopicDetailsHeader




import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';
import { motion } from 'framer-motion';
import { Mousewheel, Pagination, Scrollbar } from 'swiper/modules';
import { FaLocationDot } from "react-icons/fa6";
import { Rings } from 'react-loader-spinner'
import ArrowDown from '@/svgs/ArrowDown';
import { Alarm } from '@/svgs/Alarm';
import Mouse from '@/svgs/Mouse';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';

const TopicDetailsHeader = ({ dataContentDetails, dataStaticWords }) => {
  const router = useRouter();
  const currentContent = dataContentDetails.currentContent;
  const [currentIndex, setCurrentIndex] = useState(0)
  const stepsData = currentContent.drobSteps;
  const swiperRef = useRef(null);
  const wheelREf = useRef(null);


  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);

    // Directly use the swiper instance passed to the function

  };

  useEffect(() => {
    const swiper = swiperRef.current.swiper
    if (swiperRef.current && swiper) {
      if (swiper.realIndex === 0) {
        swiper.disable()

      } else {
        swiper.enable()
      }
    }

  }, [currentIndex])

  const handleSlideControls = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.enable()
      swiperRef.current.swiper.slideTo(1)
    }
  }
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      // Ensure stepsData[index] is valid and has a property `placeName`
      return `
      <span class="${className}">

      <p>${index !== currentIndex ? index !== stepsData.length + 1 ? index : '' : ''}</p>
        </span>
        </div>

        `;
    },
  };






  // Steps control

  const firstStep = stepsData !== null ? stepsData[0] : dataContentDetails.currentContent;
  const lastStep = stepsData !== null ? stepsData[stepsData.length - 1] : [];
  const stepsDataFiltred = stepsData !== null ? stepsData.filter((step) => step !== lastStep) : [];

  const features = currentContent.relatedFeatures;

  // images control

  const [activeImage, setActiveImage] = useState(null);

  const toggleActive = (imageUrl) => {
    setActiveImage(activeImage === imageUrl ? null : imageUrl);
  };

  return (
    <header className={styles.topic_details_header} id='topic_details_header'>







      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={pagination}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        ref={swiperRef}
      >
        <SwiperSlide >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.swiper_container}
          >
            {firstStep.image !== null &&
              <div className={styles.main_image_slider}>
                <img src={currentContent.icon.includes(',') ? currentContent.icon.split(',')[0] : currentContent.icon} alt="" />
              </div>
            }

            <div className={styles.sec_container}>
              <div className="container d-flex h-100">
                <div className={styles.slideContent}>
                  <div className={styles.text_container}>
                    <div className={styles.title}>
                      <h2>{currentContent.name}</h2>
                    </div>

                    <div className={styles.boxes_container}>
                      {features &&
                        features.map((f, idx) =>
                          <div className={styles.box} key={idx}>
                            <div className={styles.icon_container}>
                              <img src={f.icon} alt={f.name} />
                            </div>
                            <p>{f.name}</p>
                          </div>
                        )
                      }
                    </div>



                    <div className={styles.middle_box}>
                      <div className={styles.icon_container} >
                        <FaLocationDot />
                      </div>

                      <div className={styles.start} >
                        <p>{dataStaticWords.startoftour}</p>

                      </div>

                      <div className={styles.box_desc}>
                        <p> {firstStep.name}</p>
                      </div>


                      <button className={styles.btn_container}
                        onClick={handleSlideControls}
                      >
                        <p>{firstStep.stepName}</p>
                      </button>

                      <div className={styles.arrow_container}
                        onClick={handleSlideControls}
                      >
                        <ArrowDown />
                      </div>
                    </div>


                  </div>



                  <div className={styles.details_container}>
                    <div className={styles.hours}>
                      <div className={styles.icon_container}>
                        <Alarm />

                      </div>

                      <p>
                        {dataContentDetails.currentContent.tourHours <= 1 && (`${dataContentDetails.currentContent.tourHours} ${dataStaticWords.hour}`)}
                        {dataContentDetails.currentContent.tourHours > 1 && (`${dataContentDetails.currentContent.tourHours} ${dataStaticWords.hours}`)}
                      </p>
                    </div>

                    <div id="vertical_swiper" className={styles.vertical_swiper}>
                      <div className={styles.boxes_container}>
                        <Swiper
                          // direction={'vertical'}
                          // ref={wheelREf}
                          // pagination={{
                          //   clickable: true,
                          // }}
                          // slidesPerView={5}
                          // spaceBetween={16}
                          // mousewheel={true}
                          // modules={[Mousewheel, Scrollbar]}
                          // scrollbar={true}
                          // className={styles.swiper_container}

                          direction={'vertical'}
                          ref={wheelREf} // Make sure the ref name matches what you've defined
                          pagination={{
                            clickable: true,
                          }}
                          slidesPerView={3.1}
                          spaceBetween={16}
                          mousewheel={true}
                          modules={[Mousewheel,]} // Add Scrollbar to modules

                          className={styles.swiper_container}


                        >
                          {firstStep?.image?.split(',').map((imageUrl, index) => (
                            <SwiperSlide key={index} className={styles.swiper_slide_box}>
                              <div className={styles.img_container} onClick={() => toggleActive(imageUrl)}>
                                <img src={imageUrl} alt={`Image ${index + 1}`} />
                              </div>
                            </SwiperSlide>
                          ))}






                        </Swiper>



                      </div>
                    </div>
                  </div>

                  {
                    activeImage && (
                      <div className={styles.fullScreenImage} onClick={() => setActiveImage(null)}>
                        <img src={activeImage} alt="Expanded view" />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>


          </motion.div>




        </SwiperSlide>


        {stepsDataFiltred.map((step, index) => {



          return (
            <SwiperSlide key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={styles.swiper_container}
              >
                {step.image !== null &&
                  <motion.div


                    className={styles.main_image_slider}>
                    <motion.img initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      src={step?.image?.includes(',') ? step?.image?.split(',')[0] : step?.image} alt="" />
                  </motion.div>
                }


                <div className={styles.sec_container}>
                  <div className="container d-flex h-100">
                    <div className={styles.slideContent}>
                      <div className={styles.text_container}>
                        <div className={styles.title}>
                          <h2>{step.placeName}</h2>
                        </div>

                        <div className={styles.middle_box2}>


                          <div className={styles.desc}>

                            <p>{step.placeDescription}

                              الإنطلاق من منطقة مصليات العيد في الجهة الجنوبية
                              من المسجد النبوي
                            </p>

                          </div>



                          <Link href={`/details/${step.linkContentId}`} className={styles.btn_container}>
                            <p>{dataStaticWords.more}</p>

                            <div className={styles.arrow_container}>
                              <IoIosArrowBack />
                            </div>
                          </Link>


                          <div className={styles.desc2}>

                            <p>{step.name}
                              الإنطلاق من منطقة مصليات العيد في الجهة الجنوبية
                              من المسجد النبوي
                            </p>

                          </div>

                          <div className={styles.mouse_container}>
                            <Mouse />
                          </div>



                        </div>


                      </div>



                      <div className={styles.details_container}>
                        <div className={styles.hours}>
                          <div className={styles.icon_container}>
                            <Alarm />

                          </div>

                          <p>
                            {step.tourHours <= 1 && (`${step.tourHours} ${dataStaticWords.hour}`)}
                            {step.tourHours > 1 && (`${step.tourHours} ${dataStaticWords.hours}`)}
                            {step.totalMinutes && (`${step.totalMinutes} ${dataStaticWords.minute}`)}



                          </p>
                        </div>

                        <div id="vertical_swiper" className={styles.vertical_swiper}>
                          <div className={styles.boxes_container}>
                            <Swiper
                              // direction={'vertical'}
                              // ref={wheelREf}
                              // pagination={{
                              //   clickable: true,
                              // }}
                              // slidesPerView={5}
                              // spaceBetween={16}
                              // mousewheel={true}
                              // modules={[Mousewheel, Scrollbar]}
                              // scrollbar={true}
                              // className={styles.swiper_container}

                              direction={'vertical'}
                              ref={wheelREf} // Make sure the ref name matches what you've defined
                              pagination={{
                                clickable: true,
                              }}
                              slidesPerView={5}
                              spaceBetween={16}
                              mousewheel={true}
                              modules={[Mousewheel, Scrollbar]} // Add Scrollbar to modules
                              scrollbar={{
                                el: '.swiper-scrollbar', // This is a CSS selector for the scrollbar element
                                draggable: true, // This allows dragging the scrollbar to scroll
                                hide: false, // Set to true if you want the scrollbar to be hidden automatically
                              }}
                              className={styles.swiper_container}


                            >

                              {step?.image?.split(',').map((imageUrl, index) => (
                                <SwiperSlide key={index} className={styles.swiper_slide_box}>
                                  <div className={styles.img_container} onClick={() => toggleActive(imageUrl)}>
                                    <img src={imageUrl} alt={`Image ${index + 1}`} />
                                  </div>
                                </SwiperSlide>
                              ))}





                            </Swiper>



                          </div>
                        </div>

                      </div>
                      {
                        activeImage && (
                          <div className={styles.fullScreenImage} onClick={() => setActiveImage(null)}>
                            <img src={activeImage} alt="Expanded view" />
                          </div>
                        )
                      }

                    </div>
                  </div>
                </div>
              </motion.div >
            </SwiperSlide >
          )
        })}







      </Swiper >

    </header >

  );
};

export default TopicDetailsHeader;
