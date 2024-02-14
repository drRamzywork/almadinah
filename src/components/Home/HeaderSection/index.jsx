import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import Image from 'next/image'
import styles from './index.module.scss'
import Mosque from '@/svgs/Mosque.svg'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link'


const images2 =
  [
    { imgSrc: '/assets/bannerImgs/mosque.svg', shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)' },
    { imgSrc: '/assets/bannerImgs/bulding.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/bannerImgs/rock.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
  ]





const HeaderSection = () => {
  const route = useRouter()



  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images2[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images2.length);
    }, 5000); // Rotate images every 9 seconds
    return () => clearInterval(interval);
  }, []);

  // Animation variants for framer-motion
  const imageVariants = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };


  return (
    <>
      <header id={'header'} className={styles.header}
        style={{ background: currentImage.bgColor }}
      >
        <Navbar />


        <div className={styles.top_cloud}>
          <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />

        </div>


        <div className="container">

          <div className={styles.banner_container} >



            <div className={styles.right_side}>


              <div className={styles.main_title}>
                <h2>المدينة المنورة</h2>
              </div>


            </div>


            <div className={`${styles.left_side}`} >
              <motion.div
                key={currentImage.imgSrc} // Key changes on image change, triggering re-render
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                transition={{ duration: 1 }} // Smooth transition over 1 second


                className={`${styles.main_img_container}`}>

                <img src={currentImage.imgSrc} width={539} height={546.45} alt="Banner Image"
                />

                <div className={styles.birds}>
                  <Image src={'/assets/bannerImgs/birds.svg'} width={128} height={82} />
                </div>



              </motion.div>


              <div className={styles.shape} style={{ background: currentImage.shapeColor }} />


            </div>
          </div>

        </div>





        <motion.div
          key={currentImage.imgSrc} // Key changes on image change, triggering re-render
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 1 }} // Smooth transition over 1 second

          className={`${styles.blur_img}`}

        >
          <Image src={currentImage.imgSrc} width={1440} height={413} />
        </motion.div>


        <div className={styles.lines}>
          <Image src={'/assets/bannerImgs/lines.svg'} width={8169.95} height={2105.82} />

        </div>


        <div className={styles.cloud}>
          <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />
        </div>


      </header >

      {
        route.pathname === '/' &&
        <section id='hero' className={styles.hero}>
          <div className="container">

            <div className={styles.boxes_container}>
              <div className={styles.box}>
                <div className={styles.icon_container}>
                  <Image src={Mosque} width={20} height={24} />
                </div>
                <div className={styles.text_container}>
                  <p>المسجد النبوي</p>
                  <div className={styles.arrow_container}>
                    <IoIosArrowBack />
                  </div>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.background_image}>
                  <Image src={'/assets/images/tourist_attractions.png'} width={
                    201} height={165} />
                </div>



                <div className={styles.text_container}>
                  <p>
                    معالم <br /> المدينة
                  </p>
                  <div className={styles.arrow_container}>
                    <IoIosArrowBack />
                  </div>
                </div>

              </div>
            </div>

            <div className={styles.boxes_container2}>


              <Link href={'#virtual_guide'} className={styles.box}>
                <div className={styles.background_image}>
                  <Image src={'/assets/images/card_bg.png'} width={
                    201} height={165} />
                </div>

                <div className={styles.text_container}>
                  <p>المرشد <br /> الافتراضي</p>
                  <div className={styles.arrow_container}>
                    <IoIosArrowBack />
                  </div>
                </div>

                <div className={styles.image_container}>
                  <Image width={124.45} height={178.6} src="/assets/images/Background_hands_mob.png" alt="" />

                </div>
              </Link>


              <div className={styles.box}>
                <div className={styles.background_image}>
                  <Image src={'/assets/images/tourist_attractions2.png'} width={
                    201} height={165} />
                </div>

                <div className={styles.icon_container}>
                  <Image src={'/assets/svgs/castle_icon.svg'} width={20} height={24} />
                </div>


                <div className={styles.text_container}>
                  <p>مرافق المدينة</p>

                </div>
              </div>

            </div>
          </div>
        </section>
      }

    </>
  )
}

export default HeaderSection