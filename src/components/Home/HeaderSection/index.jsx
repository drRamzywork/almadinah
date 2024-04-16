import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import Image from 'next/image'
import styles from './index.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import Link from 'next/link'




const images =
  [
    { imgSrc: '/assets/bannerImgs/mosque.svg', shapeColor: 'linear-gradient(180deg, #D3C1BD 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(271deg, #B7A697 0%, #377A8A 60.34%)' },
    { imgSrc: '/assets/bannerImgs/bulding.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 57,105, 0.4) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(86deg, #8E8EAE 60%, #d3c1bd00 88.34%)' },
    { imgSrc: '/assets/bannerImgs/rock.svg', shapeColor: 'linear-gradient(180deg, rgba(56, 122, 138, 0.3) 0%, rgba(211, 193, 189, 0) 129.34%)', bgColor: 'linear-gradient(90deg, rgb(183, 166, 151) 58%, rgb(55, 122, 138) 93.34%)' },
  ]




const HeaderSection = ({ parentName, topics, dataAllLangs, dataStaticWords, dir }) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];
  const route = useRouter()
  const masjedData = topics?.filter((topic) => topic.id === 20)[0];
  const m3alemData = topics?.filter((topic) => topic.id === 1)[0];
  const guidData = topics?.filter((topic) => topic.id === 4)[0];
  const marafeqData = topics?.filter((topic) => topic.id === 13)[0];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };


  return (
    <>
      {
        router.pathname === '/details/[id]' ?
          <></>
          :
          <>
            <Navbar dataAllLangs={dataAllLangs} dir={dir} />
            <header id={'header'} className={styles.header}
              style={{ background: currentImage.bgColor, height: router.pathname === '/details/[id]' && '519px' }}
              dir={dir}>


              <div className={`${styles.top_cloud} ${router.pathname === '/details/[id]' && styles.right}`}>
                <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />

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

                  }

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




              <div className={styles.cloud}>
                <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />
              </div>

            </header >
          </>


      }



    </>

  )
}

export default HeaderSection