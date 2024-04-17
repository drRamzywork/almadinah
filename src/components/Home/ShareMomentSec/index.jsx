import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router';

const ShareMomentSec = ({ dir, dataStaticWords }) => {
  const router = useRouter();
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <section id='Share_Moment_Sec' className={styles.Share_Moment_Sec} dir={dir} >

      <div className="container">
        <div className={styles.sec_container}>

          <div className={styles.sec_title}>
            <div className={styles.title}>
              <h3>{dataStaticWords.shareMomentTitle}</h3>
            </div>

            <div className={styles.icon_container}>
              <Image src={'/assets/svgs/camera.svg'} width={36.77} height={33.16} />

            </div>
          </div>

          <div className={styles.boxes_container}>

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={styles.box}
                style={{
                  width: `${getRandomWidth(138, 318)}px`,
                  height: '164px',
                }}
              >
                <img src={'/assets/images/place.png'} alt="place" style={{ width: '100%', height: '100%' }} />
              </div>
            ))}

          </div>


          <div className={styles.btn_container}>
            <button>
              <p>{dataStaticWords.morePhotosForVisitors}</p>
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
              <p>{dataStaticWords.downloadTheCityApplication}</p>
              <p>{dataStaticWords.shareWithUs}</p>
            </div>

            <div className={styles.link_container}>
              <div className={styles.icon_container}>
                <Image src='/assets/svgs/apple.svg' width={28.43} height={34} />
              </div>
              <div className={styles.text_container}>
                <p>{dataStaticWords.downloadApplication}</p>
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