import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import languagesConfig from '../../../public/locales/languagesDetails.json';

const Footer = () => {
  const router = useRouter();



  const [dataStaticWords, setDataStaticWords] = useState(null);

  useEffect(() => {
    const fetchStaticWords = async () => {
      // Find the langId based on the current locale
      const currentLang = languagesConfig.find(lang => lang.shortCut === router.locale);
      const langId = currentLang ? currentLang.id : null;

      if (!langId) {
        console.error("Language ID not found for locale:", router.locale);
        return;
      }

      try {
        const apiUrl = `https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDataStaticWords(data);
      } catch (error) {
        console.error("Failed to fetch static words:", error);
      }
    };

    if (router.locale) {
      fetchStaticWords();
    }
  }, [router.locale]);


  return (
    <footer id='footer' dir={"ltr"} className={`${styles.footer} ${router.pathname === '/' ? styles.home : ''} ${router.pathname.includes('/subdetails/') && styles.top} ${router.pathname.includes('/virtual-guide') && styles.stickyTop} `}>
      <div className="container">
        <div transition={{ duration: 0.5 }} className={styles.sec_container}>
          <div className={styles.logo}>
            <Image src='/assets/svgs/dark_logo.svg' width={118.83} height={56} />
            <Image src='/assets/images/development_logo.png' width={267.18} height={70} />
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div className={`${styles.contact} d - flex`}>
              <div className={styles.icon_container}>
                <Image src='/assets/svgs/contact.svg' width={20} height={20} />
              </div>
              <p >{dataStaticWords?.contactUs}</p>
            </div>
            <p className={styles.copyright}> {dataStaticWords?.allRightsReserved}</p>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer