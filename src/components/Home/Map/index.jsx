
// import React from 'react';
// import { GoogleMap, Marker, InfoWindow, useLoadScript, OverlayView } from '@react-google-maps/api';
// import styles from './index.module.scss';
// import { motion } from 'framer-motion';
// import { FaLocationDot } from "react-icons/fa6";


// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };



// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };



// const Map = ({ dataContentDetails }) => {

//   const center = {
//     lat: dataContentDetails ? parseFloat(dataContentDetails.lat) : 24.7136,
//     lng: dataContentDetails ? parseFloat(dataContentDetails.lng) : 46.6753,
//   };

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0",
//     libraries: ["places"],
//   });

//   const mapRef = React.useRef(null);
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const [places, setPlaces] = React.useState([]);
//   const [selectedPlace, setSelectedPlace] = React.useState(null);

//   React.useEffect(() => {
//     if (!isLoaded) return;

//     const service = new google.maps.places.PlacesService(mapRef.current);
//     service.nearbySearch(
//       { location: center, radius: 500, type: ['restaurant'] },
//       (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//           setPlaces(results);
//         }
//       }
//     );
//   }, [isLoaded]);

//   if (!isLoaded) return "Loading Maps";

//   const getPixelPositionOffset = (width, height) => ({
//     x: -(width / 2),
//     y: -(height / 2),
//   });


//   return (
//     <>

//       <div className={styles.map_container}>

//         <motion.div
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }} className={styles.map}>
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={13}
//             options={options}
//             onLoad={onMapLoad}
//           >

//             {/*
//             <Marker
//               position={center}
//             // icon={<FaLocationDot style={{ color: 'red' }} />}
//             /> */}

//             <OverlayView
//               position={center}
//               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//             >
//               <div className={styles.marker} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <FaLocationDot size={102} color="red" />
//               </div>
//             </OverlayView>


//           </GoogleMap>
//         </motion.div>

//       </div>

//     </>

//   );

// };

// export default Map;

// ======================================================
// import React from 'react';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
// import styles from './index.module.scss';
// import { motion } from 'framer-motion';

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };

// const Map = ({ dataContentDetails }) => {
//   const center = {
//     lat: dataContentDetails ? parseFloat(dataContentDetails.lat) : 24.7136,
//     lng: dataContentDetails ? parseFloat(dataContentDetails.lng) : 46.6753,
//   };

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0", // Replace with your actual API key
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading Maps...</div>;

//   const onMarkerClick = () => {
//     const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=24.7136,46.6753`;
//     window.open(directionsUrl, '_blank');
//   };

//   return (
//     <div className={styles.map_container}>
//       <motion.div
//         initial={{ opacity: 0, y: -100 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1 }}
//         className={styles.map}
//       >
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           center={center}
//           zoom={13}
//           options={options}
//         >
//           <Marker
//             position={center}
//             onClick={onMarkerClick}
//             icon={{
//               url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon
//               scaledSize: new window.google.maps.Size(30, 30),
//             }}
//           />
//         </GoogleMap>
//       </motion.div>
//     </div>
//   );
// };

// export default Map;

// ======================================================



import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import styles from './index.module.scss';
import { motion } from 'framer-motion';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ dataContentDetails }) => {
  const center = {
    lat: dataContentDetails ? parseFloat(dataContentDetails.lat) : 24.7136,
    lng: dataContentDetails ? parseFloat(dataContentDetails.lng) : 46.6753,
  };

  // Ensure the API key is stored securely in your environment variables and accessed here
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

  const onMarkerClick = () => {
    // Open Google Maps directions in a new tab using the center's coordinates
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className={styles.map_container}>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.map}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={options}
        >
          <Marker
            position={center}
            onClick={onMarkerClick}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        </GoogleMap>
      </motion.div>
    </div>
  );
};

export default Map;
