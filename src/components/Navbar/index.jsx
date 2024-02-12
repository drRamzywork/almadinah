import React from 'react'
import styles from './index.module.scss';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='container '>
      <nav className="navbar  " id={styles.navbar}>
        <a className="navbar-brand">
          <Image className={styles.logo} src={'/assets/images/Logo_white.png'} width={118.64} height={56} />
        </a>
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
      </nav>


    </div>
  )
}

export default Navbar