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
//   const features = dataContentDetails.currentContent.relatedFeatures;
//   const stepsData = dataContentDetails.currentContent.drobSteps;
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




import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';
import { motion } from 'framer-motion';
import { Mousewheel, Pagination } from 'swiper/modules';
import { FaLocationDot } from "react-icons/fa6";
import { Rings } from 'react-loader-spinner'

const TopicDetailsHeader = ({ dataContentDetails }) => {
  const stepsData = dataContentDetails.currentContent.drobSteps;
  const swiperRef = useRef(null);


  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"><p>' + (index + 1) + '</p></span>';
    },
  };




  // Steps control
  const firstStep = stepsData[0];
  const lastStep = stepsData[stepsData.length - 1];

  const stepsDataFiltred = stepsData.filter((step) => step !== firstStep && step !== lastStep);

  console.log(lastStep, "pagination1")
  console.log(stepsData, "pagination1")
  // Steps control

  return (
    <header className={styles.topic_details_header} id='topic_details_header'>


      <div className="container">

        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={pagination}
          modules={[Mousewheel, Pagination]}
          className="mySwiper"
          ref={swiperRef}
        >
          <SwiperSlide >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.swiper_container}
            >

              <div className={styles.main_image_slider}>
                <img src="" alt="" />
              </div>
              <div className="sec_container">
                <div className={styles.slideContent}>
                  <div className={styles.box}>
                    <div className="icon_container">
                      <FaLocationDot />
                    </div>
                    <h2>{firstStep.stepName}</h2>
                    <p>{firstStep.placeDescription}</p>
                    <p>Duration: {firstStep.totalMinutes} minutes</p>
                    <p>Link: {firstStep.link}</p>
                    <img src={firstStep.image} alt={firstStep.name} />
                  </div>
                </div>
              </div>


            </motion.div>
          </SwiperSlide>


          {stepsDataFiltred.map((step, index) => (
            <SwiperSlide key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.swiper_container}
              >

                <div className={styles.main_image_slider}>
                  <img src="" alt="" />
                </div>


                <div className="container">
                  <div className={styles.sec_container}>
                    <div className={styles.slideContent}>
                      <div className={styles.box}>
                        <h2>{step.name}</h2>
                        <p>{step.placeDescription}</p>
                        <p>Duration: {step.totalMinutes} minutes</p>
                        <p>Link: {step.link}</p>
                        <img src={step.image} alt={step.name} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}






          <SwiperSlide >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.swiper_container}
            >
              <div className={styles.main_image_slider}>
                <img src="" alt="" />
              </div>
              <div className="container">
                <div className="sec_container">
                  <div className={styles.slideContent}>
                    <div className={styles.box}>
                      <div className="icon_container">
                        <FaLocationDot />
                      </div>
                      <h2>{lastStep.name}</h2>
                      <p>{lastStep.placeDescription}</p>
                      <p>Duration: {lastStep.totalMinutes} minutes</p>
                      <p>Link: {lastStep.link}</p>
                      <img src={lastStep.image} alt={lastStep.name} />
                    </div>
                  </div>
                </div>
              </div>


            </motion.div>
          </SwiperSlide>
        </Swiper>

      </div>


    </header>

  );
};

export default TopicDetailsHeader;
