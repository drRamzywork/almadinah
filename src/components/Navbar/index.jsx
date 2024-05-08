import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { setCookie, } from 'nookies'

const Navbar = ({ dataAllLangs, cName, dataDrobTopic, parentName, dataMainTopic, dir, setIsOpen, isOpen, dataStaticWords }) => {
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      setHidden(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  function handleClick(lng) {
    setCookie(null, 'NEXT_LOCALE', lng.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    const newPath = buildLocaleSwitchUrl(lng.shortCut);

    router.push(newPath);
  }

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
  }, [navMenu]);


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
  const contentID2 = dataMainTopic?.find(topic => topic.contentIdFK === Number(router.query.id));


  // Search Logic
  const [inputValue, setInputValue] = useState('');
  const [showTags, setShowTags] = useState(false);

  const tags = dataStaticWords?.searchKeywords?.split(',');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${encodeURIComponent(inputValue)}`);
  };

  const handleTagClick = (tag) => {
    router.push(`/search/${encodeURIComponent(tag)}`);
  };

  //End Search Logic



  return (
    <nav
      className={`navbar fixed-top ${cName}
       ${!router.pathname.includes('subdetails') && hidden ? styles.hidden : ''}`}
      id={styles.navbar}
      dir={dir}
    >

      <div className='container'>
        <Link href={'/'} className={`${styles.navbar_logo} navbar-brand`}>
          <Image className={styles.logo} src={'/assets/images/Logo_white.png'} width={118.64} height={56} />
        </Link>



        {router.pathname.includes('/topic-details') || router.pathname.includes('subdetails') ?
          <>
            <Link href={`${contentID !== undefined ? `/topic/${contentID?.parentId}` : `/topic/${contentID2?.parentId}`} `} className={styles.main_title}>
              <h1>{contentID?.parentName} {parentName}</h1>
            </Link>

            <div className={styles.close_icon} >
              {/* {isOpen &&
                <IoIosClose onClick={() => setIsOpen(false)} />
              } */}
            </div>
          </>
          :
          <>
            {/* <form className="d-flex " role="search" >
              <input className="form-control me-2 rounded bg-transparent border-1" type="search" placeholder="ابحث عن كل ما تريد عن المدينة.." aria-label="Search" />
              <button className="btn " type="submit">
                <Image src={'/assets/svgs/Search.svg'} width={24} height={24} />
              </button>
            </form> */}



            <div>
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2 rounded bg-transparent border-1"
                  type="search"
                  placeholder={dataStaticWords?.search}
                  aria-label="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setShowTags(true)}
                  onBlur={() => setTimeout(() => setShowTags(false), 200)}
                />
                {/* <button className="btn" type="submit">
                  <Image src={'/assets/svgs/Search.svg'} alt="Search" width={24} height={24} />
                </button> */}



                <div className={`btn ${styles.btn}`} onClick={() => setShowTags(prev => !prev)}>
                  <Image src={'/assets/svgs/Search.svg'} alt="Search" width={24} height={24} />
                </div>


              </form>
              {showTags && (
                <motion.div
                  initial="closed"
                  animate={showTags ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.5, type: "tween" }}
                  className={styles.tagBox}>
                  <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input
                      className={`form-control me-2 rounded bg-transparent border-1 ${styles.input_search}`}
                      type="search"
                      placeholder={dataStaticWords?.search}
                      aria-label="Search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setShowTags(true)}
                      onBlur={() => setTimeout(() => setShowTags(false), 200)}
                    />
                  </form>
                  <div className={styles.boxes_container}>
                    {tags?.map(tag => (
                      <div key={tag} className={styles.tag} onClick={() => handleTagClick(tag)}>
                        {tag}
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}
            </div>


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

              {/*
               {
                currentLangData?.image !== null &&
                <div className={styles.img_container}>
                  <Image src={currentLangData?.image} alt="Language flag" width={20} height={20} />
                </div>
              }\
              */}

              <motion.div
                initial="closed"
                animate={navMenu ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 0.5, type: "tween" }}
                className={styles.nav_menu_container}
              >
                <div className={styles.links} onClick={() => setNavMenu(false)}>
                  {dataAllLangs?.map((language) => {
                    if (router.locale !== language.shortCut) {
                      return (
                        <a
                          href={buildLocaleSwitchUrl(language.shortCut)}
                          key={language.id} className={`${styles.link} `} onClick={() => handleClick(language)}>


                          <p >
                            {language.shortCut.toUpperCase()}
                          </p>

                          <div className={styles.icon_container}>
                            {language.image && (
                              <Image
                                src={language.image}
                                alt={`Flag of ${language.name} `}
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