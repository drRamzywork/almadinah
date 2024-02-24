import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';

const Navbar = ({ dataAllLangs }) => {
  const router = useRouter();
  const [navMenu, setNavMenu] = useState(false);
  const navMenuRef = useRef(null);

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };
  useEffect(() => {
    function handleClickOutside(event) {
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navMenuRef]);

  return (
    <div className='container '>
      <nav className={`navbar ${router.pathname.includes('/topic-details')} p-5`} id={styles.navbar} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
        <Link href={'/'} className={`${styles.navbar_logo} navbar-brand`}>
          <Image className={styles.logo} src={'/assets/images/Logo_white.png'} width={118.64} height={56} />
        </Link>

        {router.pathname.includes('/topic-details') ?
          <>
            <div className={styles.main_title}>
              <h1>معالم المدينة</h1>
            </div>
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

            <div className={styles.lang_container} onClick={() => setNavMenu(!navMenu)}>
              <div className={styles.icon_container}>
                <IoIosArrowDown />
              </div>
              <div className={styles.lang}>
                <p>
                  Ar
                </p>
              </div>

              <div className={styles.img_container}>
                <Image src={'/assets/svgs/saudi-arabia-flag-icon.svg'} width={118.64} height={56} />

              </div>

              {navMenu &&
                <motion.div
                  initial="closed"
                  animate={navMenu ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.5, type: "tween" }}
                  className={styles.nav_menu_container}
                >
                  <div className={styles.links} onClick={() => setNavMenu(false)}>



                    {dataAllLangs.map((language) => {
                      if (router.locale !== language.shortCut) {
                        return (
                          <a href={`/${language.shortCut}${router.asPath}`} key={language.id} className={`${styles.link}`}>


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

              }
            </div>

          </>



        }

      </nav>
    </div >
  )
}

export default Navbar