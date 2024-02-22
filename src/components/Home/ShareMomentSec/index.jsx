import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router';

const ShareMomentSec = () => {
  const router = useRouter();
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <section id='Share_Moment_Sec' className={styles.Share_Moment_Sec} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.nosie}>
        <Image src={'/assets/svgs/Noise.svg'} width={1440} height={888} />

      </div>
      <div className="container">
        <div className={styles.sec_container}>

          <div className={styles.sec_title}>
            <div className={styles.star}>
              <Image src={'/assets/svgs/Star.svg'} width={300} height={300} />
            </div>
            <div className={styles.title}>
              <h3>شارك لحظاتك في المدينة</h3>
              <h3 className={styles.copy}>شارك لحظاتك في المدينة</h3>
              <h3 className={styles.copy1}>شارك لحظاتك في المدينة</h3>
              <h3 className={styles.copy2}>شارك لحظاتك في المدينة</h3>
            </div>

            <div className={styles.icon_container}>
              <Image src={'/assets/svgs/camera.svg'} width={36.77} height={33.16} />

            </div>
          </div>


          <div className={styles.boxes_container}>

            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={styles.box}
                style={{
                  width: `${getRandomWidth(138, 318)}px`,
                  height: '164px', // Set the height for all boxes
                }}
              >
                <img src={'/assets/images/place.png'} alt="place" style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>


          <div className={styles.btn_container}>
            <button>
              <p>صور أكثر لزوار المدينة</p>
              <div className={styles.icon_container}>
                <IoIosArrowBack />
              </div>
            </button>

          </div>

          <div className={styles.app_card}>
            <div className={styles.logo}>
              <Image src='/assets/svgs/dark_logo.svg' width={86.96} height={86.96} />
            </div>

            <div className={styles.desc}>
              <p>حمل تطبيق المدينة،</p>
              <p>وشاركنا لقطاتك في المدينة!</p>
            </div>

            <div className={styles.link_container}>
              <div className={styles.icon_container}>
                <Image src='/assets/svgs/apple.svg' width={28.43} height={34} />
              </div>
              <div className={styles.text_container}>
                <p>حمل التطبيق</p>
                <p>App Store</p>
              </div>
            </div>


          </div>
        </div>

      </div>
    </section >
  )
}

export default ShareMomentSec