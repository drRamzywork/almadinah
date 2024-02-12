

import localFont from 'next/font/local'
import { useRouter } from "next/router";

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


export default function Layout({ children }) {
  const router = useRouter();
  const combinedStyles = {
    ...IBMPlexSans.style,
  };


  return (
    <>
      {/* {router.pathname !== '/search' &&
        <Navbar />
      } */}
      <main style={combinedStyles} dir='rtl'>
        {children}
      </main >
      {/* {router.pathname !== '/search' &&
        <Footer />
      } */}

    </>
  )
}