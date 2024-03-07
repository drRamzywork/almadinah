import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();


  return (
    <footer id='footer' dir={"ltr"} className={`${styles.footer} ${router.pathname === '/' ? styles.home : ''} ${router.pathname.includes('/subdetails/') && styles.top} ${router.pathname.includes('/virtual-guide') && styles.stickyTop} `}>
      <div className="container">
        <div className={styles.sec_container}>

          <div className={styles.logo}>
            <Image src='/assets/svgs/dark_logo.svg' width={118.83} height={56} />
            <Image src='/assets/images/development_logo.png' width={267.18} height={70} />

          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <div className={`${styles.contact} d - flex`}>
              <div className={styles.icon_container}>
                <Image src='/assets/svgs/contact.svg' width={20} height={20} />
              </div>
              <p >تواصل معنا</p>

            </div>
            <p className={styles.copyright}> &copy; الحقوق محفوظة لموقع المدينة</p>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer