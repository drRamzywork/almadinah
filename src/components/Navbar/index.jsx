import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';

const Navbar = ({ dataAllLangs, cName, dataDrobTopic, parentName }) => {
  const router = useRouter();
  const { asPath, locale } = router;

  const currentLangData = dataAllLangs?.find(lang => lang.shortCut === router.locale);

  const [navMenu, setNavMenu] = useState(false);
  const navMenuRef = useRef(null);

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-150%" },
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside of the navMenuRef and the menu is open
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {

        setNavMenu(false); // Close the nav menu
      }
    }

    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navMenu]); // Depend on navMenu so that the effect runs when it changes


  const buildLocaleSwitchUrl = (targetLocale) => {
    let basePath = asPath;

    // Check if the current path includes the current locale, and remove it
    if (basePath.startsWith(`/${locale}`)) {
      basePath = basePath.replace(`/${locale}`, '');
    }

    // Construct the new path with the target locale
    return `/${targetLocale}${basePath}`;
  };

  const contentID = dataDrobTopic?.find(topic => topic.contentIdFK === Number(router.query.id));

  return (
    <nav className={`navbar ${cName}`} id={styles.navbar} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className='container '>

        <Link href={'/'} className={`${styles.navbar_logo} navbar-brand`}>
          <Image className={styles.logo} src={'/assets/images/Logo_white.png'} width={118.64} height={56} />
        </Link>

        {router.pathname.includes('/topic-details') || router.pathname.includes('/subdetails') ?
          <>
            <Link href={`/topic/${contentID?.parentId}`} className={styles.main_title}>
              <h1>{contentID?.parentName} {parentName}</h1>
            </Link>
            <div className={styles.close_icon}>
              <IoIosClose />
            </div>
          </>

          :
          <>
            <form className="d-flex " role="search" >
              <input className="form-control me-2 rounded bg-transparent border-1" type="search" placeholder="ابحث عن كل ما تريد عن المدينة.." aria-label="Search" />
              <button className="btn " type="submit">
                <Image src={'/assets/svgs/Search.svg'} width={24} height={24} />
              </button>
            </form>

            <div className={styles.lang_container}
              ref={navMenuRef}
              onClick={() => setNavMenu((prev) => !prev)}>
              <div className={styles.icon_container}>
                <IoIosArrowDown className={navMenu === true && styles.active} />
              </div>

              <div className={styles.lang}>
                <p>
                  {router.locale.toLocaleUpperCase()}
                </p>
              </div>
              {
                currentLangData?.image !== null &&
                <div className={styles.img_container}>
                  <Image src={currentLangData?.image} alt="Language flag" width={20} height={20} />
                </div>
              }

              <motion.div
                initial="closed"
                animate={navMenu ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 0.5, type: "tween" }}
                className={styles.nav_menu_container}

              >
                <div className={styles.links} onClick={() => setNavMenu(false)}

                >



                  {dataAllLangs?.map((language) => {
                    if (router.locale !== language.shortCut) {
                      return (
                        <a href={buildLocaleSwitchUrl(language.shortCut)} key={language.id} className={`${styles.link}`}>


                          <p >
                            {language.shortCut.toUpperCase()}
                          </p>

                          <div className={styles.icon_container}>
                            {language.image && (
                              <Image
                                src={language.image}
                                alt={`Flag of ${language.name}`}
                                width={20.7}
                                height={12.88}
                              />
                            )}
                          </div>
                        </a>
                      );
                    }
                  })}



                </div>
              </motion.div>

            </div>

          </>



        }
      </div >

    </nav>
  )
}

export default Navbar