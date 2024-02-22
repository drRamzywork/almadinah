import React from 'react'
import styles from './index.module.scss';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosClose } from 'react-icons/io';

const Navbar = () => {
  const router = useRouter();

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

            <div className={styles.lang_container}>
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
            </div>

          </>



        }

      </nav>
    </div>
  )
}

export default Navbar