import React from 'react'
import Navbar from '../../Navbar'
import Image from 'next/image'
import styles from './index.module.scss'
import Mosque from '@/svgs/Mosque.svg'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router'

const HeaderSection = () => {
  const route = useRouter()
  return (
    <>
      <header id={'header'} className={styles.header}
        style={{
          backgroundImage:
            route.pathname === '/' ?
              'url("/assets/images/Banner.png")'
              :
              'url("/assets/images/BannerPage1.png")'
        }}>
        <Navbar />
      </header>

      {route.pathname === '/' &&
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


              <div className={styles.box}>
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
              </div>


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