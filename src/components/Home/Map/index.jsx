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

const markers = [
  { id: 1, lat: 24.7136, lng: 46.6753, name: 'Place One', imageUrl: '/assets/images/place.png' },
  { id: 2, lat: 24.746, lng: 46.7400, name: 'Place Two', imageUrl: '/assets/images/place.png' },
  { id: 2, lat: 24.699, lng: 46.7400, name: 'Place Two', imageUrl: '/assets/images/place.png' },
  { id: 2, lat: 24.7146, lng: 46.7400, name: 'Place Two', imageUrl: '/assets/images/place.png' },
  { id: 3, lat: 24.7176, lng: 46.6243, name: 'Place Three', imageUrl: '/assets/images/place.png' },
  // Add more markers as needed
];

const Map = ({ dataContentDetails }) => {
  const router = useRouter();

  const onMarkerClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(directionsUrl, '_blank');
  };


  const center = {
    lat: dataContentDetails ? parseFloat(dataContentDetails.lat) : 24.7136,
    lng: dataContentDetails ? parseFloat(dataContentDetails.lng) : 46.6753,
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
          zoom={13}
          options={options}
        >
          {router.pathname === '/' ? <>
            {markers.map((marker, index) => (
              <OverlayView
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                onClick={onMarkerClick}
              >
                <CustomMarker center={center} imageUrl={marker.imageUrl} />
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

          </>}




        </GoogleMap>
      </motion.div>
    </div>
  );
};

export default Map;
