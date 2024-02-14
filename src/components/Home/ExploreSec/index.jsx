// import React, { useState } from 'react'
// import styles from './index.module.scss'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// const ExploreSec = () => {

//   const [hovered, setHovered] = useState(null);

//   const onHoverStart = (index) => setHovered(index);
//   const onHoverEnd = () => setHovered(null);

//   // Define variants for Framer Motion animations
//   const boxVariants = {
//     hovered: { width: 480, height: 800, zIndex: 2 },
//     unhovered: { width: 100, height: 100, zIndex: 0 },
//   };

//   const contentVariants = {
//     show: { display: 'block', opacity: 1, transition: { delay: 0.2 } },
//     hide: { display: 'none', opacity: 0 },
//   };

//   return (
//     <section id='explore' className={styles.explore}>
//       <div className="container">
//         <div className={`${styles.sec_title}  sec_title`}>
//           <h3>استكشف المدينة المنورة</h3>

//           <div className={styles.icon_container}>
//             <Image width={208.76} height={209.51} src='/assets/svgs/Safe_Icon.svg' />
//           </div>
//         </div>
//         <div className={styles.boxes_container}>
//           <Swiper
//             breakpoints={{
//               300: {
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//               },
//               400: {
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//               },
//               414: {
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//               },
//               640: {
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//               },
//               768: {
//                 slidesPerView: 2,
//                 spaceBetween: 0,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 0,
//               },
//             }}
//             dir={`rtl`}
//             className={styles.swiper_container}
//           >

//             <SwiperSlide className={styles.swiper_slide_box}>
//               <div className={styles.box}>
//                 <div className={styles.background_image}>
//                   <Image width={208.76} height={209.51} src='/assets/images/roads.png' />
//                 </div>

//                 <div className={styles.icon_container}>
//                   <Image width={208.76} height={209.51} src='/assets/svgs/location_flag.svg' />
//                 </div>

//                 <div className={styles.title}>
//                   <h5>دروب المدينة</h5>
//                 </div>

//                 <div className={styles.desc}>
//                   <p>جولات معدة بعناية وفق اهتماماتك واحتياجاتك.</p>
//                 </div>

//               </div>
//             </SwiperSlide>
//             <SwiperSlide className={styles.swiper_slide_box}>

//               <div className={styles.box}>
//                 <div className={styles.background_image}>
//                   <Image width={208.76} height={209.51} src='/assets/images/Bage_middle.png' />
//                 </div>

//                 <div className={styles.icon_container}>
//                   <Image width={208.76} height={209.51} src='/assets/svgs/castle_icon_purble.svg' />
//                 </div>

//                 <div className={styles.title}>
//                   <h5>معالم المدينة</h5>
//                 </div>

//                 <div className={styles.desc}>
//                   <p>زر أشهر معالم المدينة التاريخية والحديثة</p>
//                 </div>

//               </div>
//             </SwiperSlide>
//             <SwiperSlide className={styles.swiper_slide_box}>

//               <div className={styles.box}>
//                 <div className={styles.background_image}>
//                   <Image width={208.76} height={209.51} src='/assets/images/Bage_Left.png' />
//                 </div>

//                 <div className={styles.icon_container}>
//                   <Image width={208.76} height={209.51} src='/assets/svgs/Vector_icon.svg' />
//                 </div>

//                 <div className={styles.title}>
//                   <h5>مرافق المدينة </h5>
//                 </div>

//                 <div className={styles.desc}>
//                   <p>استمتع بزيارة عدة مرافق متنوعة </p>
//                 </div>

//               </div>
//             </SwiperSlide>
//           </Swiper>





//         </div>

//       </div>
//     </section>
//   )
// }

// export default ExploreSec


// sssssss


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss'; // Ensure this is the correct path to your SCSS file
import Image from 'next/image';

const ExploreSec = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);



  const boxData = [
    {
      id: 1,
      title: 'دروب المدينة',
      description: 'جولات معدة بعناية وفق اهتماماتك واحتياجاتك.',
      image: '/assets/images/roads.png',
      icon: '/assets/svgs/location_flag.svg'
    },
    {
      id: 2,
      title: 'معالم المدينة',
      description: 'زر أشهر معالم المدينة التاريخية والحديثة',
      image: '/assets/images/Bage_middle.png',
      icon: '/assets/svgs/castle_icon_purble.svg'
    },
    {
      id: 3,
      title: 'مرافق المدينة ',
      description: 'استمتع بزيارة عدة مرافق متنوعة.',
      image: '/assets/images/Bage_Left.png',
      icon: '/assets/svgs/Vector_icon.svg'
    },
  ];

  const boxVariants = {
    normal: {
      width: '500px',
      height: '800px',
      transition: { duration: 0.2 }
    },
    hovered: {
      width: '1580px',
      height: '800px',
      transition: { duration: 0.2 }
    },
    smallBox: {
      width: '200px',
      height: '200px',
      backgroundColor: 'red',
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id='explore' className={styles.explore}>
      <div className={styles.boxes_container}>
        {boxData.map((box, index) => (


          <>
            {/* 
            <motion.div
              key={box.id}
              className={styles.box}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={hoveredIndex === index ? 'hovered' : 'normal'}
              variants={boxVariants}
            >
              {hoveredIndex === index ? (
                <motion.div
                  className={styles.innerBoxes}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div key={i} variants={boxVariants.smallBox} />
                  ))}
                </motion.div>
              ) : (
                <div className={styles.icon_container}>
                  <img src={box.icon} alt="Icon" />
                </div>
              )}
            </motion.div> */}


            <motion.div
              key={box.id}
              className={styles.box}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={hoveredIndex === index ? 'hovered' : 'normal'}
              variants={boxVariants}>
              <div className={styles.background_image}>
                <Image width={208.76} height={209.51} src={box.image} />
              </div>

              <div className={styles.icon_container}>
                <Image width={208.76} height={209.51} src={box.icon} />
              </div>
              {/* 
              <div className={styles.title}>
                <h5>{box.title}</h5>
              </div>

              <div className={styles.desc}>
                <p>جولات معدة بعناية وفق اهتماماتك واحتياجاتك.</p>
              </div> */}


              {hoveredIndex === null || hoveredIndex === index ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.inner_container}
                >

                  <div className={styles.text_container}>
                    <div className={styles.title}>
                      <h5>{box.title}</h5>
                    </div>
                    <div className={styles.desc}>
                      <p>جولات معدة بعناية وفق اهتماماتك واحتياجاتك.</p>
                    </div>
                  </div>
                </motion.div>
              ) :
                ''
              }


              {hoveredIndex === index && <h1></h1>}

            </motion.div >


          </>
        ))}
      </div>
    </section >

  );
};

export default ExploreSec;
