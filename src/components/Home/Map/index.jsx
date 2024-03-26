import React from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import styles from './index.module.scss';
import { motion } from 'framer-motion';
import CustomMarker from './components/CustomMarker';
import { useRouter } from 'next/router';


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  styles: [

    {
      featureType: "all",
      stylers: [{ visibility: "on" }]
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};




const Map = ({ dataContentDetails, dataMapData }) => {
  const router = useRouter();

  // console.log(dataMapData, "dataMapDatadataMapData")
  const onMarkerClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(directionsUrl, '_blank');
  };



  const center = {
    lat: dataContentDetails ? parseFloat(dataContentDetails.lat) : 24.470901,
    lng: dataContentDetails ? parseFloat(dataContentDetails.lng) : 39.612236,
  };








  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

  const icon = dataContentDetails?.icon;
  const images1 = icon?.includes(',') ? icon.split(',') : [icon];


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
          zoom={10}
          options={options}
        >


          {router.pathname === '/' ? <>
            {dataMapData.map((marker, index) => (
              <OverlayView
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                onClick={onMarkerClick}
              >
                <CustomMarker center={center} imageUrl={marker.icon.includes(',') ? marker.icon.split(',')[0] : marker.icon} name={marker.name} />
              </OverlayView>
            ))}
          </> : <>


            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              onClick={onMarkerClick}
            >
              <CustomMarker center={center} imageUrl={images1[0]} />
            </OverlayView>
          </>
          }
        </GoogleMap>
      </motion.div>
    </div>
  );
};

export default Map;
