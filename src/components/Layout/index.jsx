

import localFont from 'next/font/local'
import { useRouter } from "next/router";
import Footer from '../Footer';
import styles from "@/styles/Home.module.scss";

const IBMPlexSans = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-Bold.ttf",
      style: "bold",
      weight: '800',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-ExtraLight.ttf",
      style: "normal",
      weight: '400',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-Light.ttf",
      style: "normal",
      weight: '600',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-Medium.ttf",
      style: "normal",
      weight: '700',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-Regular.ttf",
      style: "normal",
      weight: '500',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-SemiBold.ttf",
      style: "normal",
      weight: '600',
    },
    {
      path: "../../../public/assets/fonts/IBMPlexSansArabic-Thin.ttf",
      style: "normal",
      weight: '700',
    },
  ],
});


export default function Layout({ children, }) {
  const router = useRouter();
  const combinedStyles = {
    ...IBMPlexSans.style,
  };


  return (
    <>
      <main style={combinedStyles} dir={router.locale === 'ar' || 'ur' ? 'rtl' : 'ltr'} className={styles.main}>
        {children}
      </main >

      {!router.pathname.includes('/topic-details/[id]') &&
        <Footer />
      }
    </>
  )
}