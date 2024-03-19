import React, { useState } from 'react'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { IoIosClose } from 'react-icons/io';

const GallerySwiper = ({ activeImageIndex, dir, imageUrls, isFullscreenSwiperOpen }) => {


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.gallery_Image}
        id='gallery_Image'
      >

        <Swiper
          key={`fullscreen-swiper-${isFullscreenSwiperOpen}`}
          spaceBetween={16}
          slidesPerView={1}
          initialSlide={activeImageIndex}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="gallery_Image"
          dir={dir}
          centeredSlides={true}
        >

          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt='' />
              <div className={styles.close_icon} >
                <IoIosClose />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  )
}

export default GallerySwiper