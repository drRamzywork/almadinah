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

const markers = [
  { id: 1, lat: 24.7136, lng: 46.6753, name: 'Place One', imageUrl: '/assets/images/place.png' },
  { id: 2, lat: 24.7146, lng: 46.6743, name: 'Place Two', imageUrl: '/assets/images/place.png' },
  { id: 3, lat: 24.7126, lng: 46.6763, name: 'Place Three', imageUrl: '/assets/images/place.png' },
  // Add more markers as needed
];

console.log(markers, "markers")

const Map = ({ dataContentDetails }) => {
  const center = {
    lat: 24.7136,
    lng: 46.6753,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Use your env variable here
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className={`${styles.map_container} mt-5 pt-5`} >
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

          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.name}
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${marker.lat},${marker.lng}`, '_blank')}
              icon={{
                url: '/assets/images/place.png',
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
        </GoogleMap>
      </motion.div>
    </div>
  );
};

export default Map;
