import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Image from 'next/image'
import styles from './index.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import Link from 'next/link'






const DynamicHeader = ({ parentName, topics, dataAllLangs, dataStaticWords, dir }) => {
  const router = useRouter()
  const routerID = Number(router.query.id);

  // M3alem
  const m3alemImages = [
    {
      imgSrc: '/assets/m3alem/abars/abar1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/mta7ef/mt7f2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/m3alem/msaged/masjd1.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

    {
      imgSrc: '/assets/m3alem/mwaqe3/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
  ]

  const msaged = [
    {
      imgSrc: '/assets/m3alem/msaged/masjd1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/msaged/masjd2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/m3alem/msaged/masjd3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

    {
      imgSrc: '/assets/m3alem/msaged/masjd4.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/msaged/masjd5.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/m3alem/msaged/masjd6.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

    {
      imgSrc: '/assets/m3alem/msaged/masjd7.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/msaged/masjd8.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/m3alem/msaged/masjd9.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

  ]

  const abars = [
    {
      imgSrc: '/assets/m3alem/abars/abar1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/abars/abar2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },


  ]

  const mwaqe3 = [
    {
      imgSrc: '/assets/m3alem/mwaqe3/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/mwaqe3/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/m3alem/mwaqe3/3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
    {
      imgSrc: '/assets/m3alem/mwaqe3/4.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/mwaqe3/5.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
  ]

  const mta7ef = [
    {
      imgSrc: '/assets/m3alem/mta7ef/mt7f1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/m3alem/mta7ef/mt7f2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },

  ];

  // M3alem

  // ###

  // Marafeq
  const mrafeq = [
    {
      imgSrc: '/assets/mrafeq/fa3lyat/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/mrafeq/montzahat/1.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/mrafeq/fa3lyat/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
  ]

  const fa3lyat = [
    {
      imgSrc: '/assets/mrafeq/fa3lyat/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/mrafeq/fa3lyat/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/mrafeq/fa3lyat/3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

    {
      imgSrc: '/assets/mrafeq/fa3lyat/4.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },

  ]

  const montzahat = [
    {
      imgSrc: '/assets/mrafeq/montzahat/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/mrafeq/montzahat/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/mrafeq/montzahat/3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },

    {
      imgSrc: '/assets/mrafeq/montzahat/4.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/mrafeq/montzahat/5.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },

  ]
  // Marafeq

  // ###

  // Drop
  const drop = [
    {
      imgSrc: '/assets/drop/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/drop/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/drop/3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
  ]
  // Drop

  // ###

  // المسجد النبوي
  const المسجد_النبوي = [
    {
      imgSrc: '/assets/المسجد النبوي/1.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/المسجد النبوي/2.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/المسجد النبوي/3.webp', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
    {
      imgSrc: '/assets/المسجد النبوي/4.webp',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
  ]

  // ###

  const imagesByRouterId = {
    // M3alem
    1: m3alemImages,
    9: abars,
    8: msaged,
    10: mwaqe3,
    11: mta7ef,
    // Marafeq
    13: mrafeq,
    15: fa3lyat,
    14: montzahat,
    // Drop
    2: drop,
    // المسجد النبوي
    20: المسجد_النبوي

  };

  // Default images array, could be used as a fallback
  const defaultImages = [
    {
      imgSrc: '/assets/bannerImgs/mosque.svg',
      shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)'
    },
    { imgSrc: '/assets/bannerImgs/bulding.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/bannerImgs/rock.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
  ];

  const images = imagesByRouterId[routerID] || defaultImages;



  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  const imageVariants = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <>
      {
        router.pathname === '/details/[id]' ?
          <>
          </>
          :
          <>
            <Navbar dataAllLangs={dataAllLangs} dir={dir} dataStaticWords={dataStaticWords} />
            <header id={'header'} className={styles.header}
              style={{ background: currentImage.bgColor, height: router.pathname === '/details/[id]' && '519px' }}
              dir={dir}>


              <div className={`${styles.top_cloud} ${router.pathname === '/details/[id]' && styles.right}`}>
                <img src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />
              </div>

              <div className="container h-100">

                <div className={styles.banner_container} >



                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}

                    className={`${styles.right_side} ${router.pathname !== '/' ? styles.right_side2 : ''}`}>


                    <div className={styles.main_title}>
                      <h2>
                        {router.pathname === '/' ?

                          dataStaticWords.siteName
                          :
                          parentName && parentName

                        }
                      </h2>

                    </div>




                  </motion.div>
                  {router.pathname !== '/details/[id]' &&
                    <div className={`${styles.left_side}`} >
                      <motion.div
                        key={currentImage.imgSrc}
                        initial="hidden"
                        animate="visible"
                        variants={imageVariants}
                        transition={{ duration: 1 }} // Smooth transition over 1 second


                        className={`${styles.main_img_container}`}>

                        <Image src={currentImage.imgSrc} width={539} height={546.45} alt="Banner Image"
                          blurDataURL={currentImage.blurSrc}
                        />

                        <div className={styles.birds}>
                          <Image src={'/assets/bannerImgs/birds.svg'} width={128} height={82} />
                        </div>



                      </motion.div>


                      <div className={styles.shape} style={{ background: currentImage.shapeColor }} />


                    </div>
                  }
                </div>
              </div>

              <motion.div
                key={currentImage.imgSrc}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                transition={{ duration: 1 }}
                className={`${styles.blur_img}`}
              >
                <Image src={currentImage.imgSrc} width={1440} height={413} />
              </motion.div>

              <div className={styles.cloud}>
                <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />
              </div>

            </header >
          </>
      }
    </>
  )
}

export default DynamicHeader