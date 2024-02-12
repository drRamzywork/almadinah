// import React from 'react';
// import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

// const mapContainerStyle = {
//   width: '100vw',
//   height: '100vh',
// };

// const center = {
//   // Center your map according to the location you want
//   lat: 24.7136,
//   lng: 46.6753,
// };

// const options = {

//   disableDefaultUI: false, // Disable default controls
//   zoomControl: true, // Add zoom controls separately
//   // Other options as needed
// };

// const markers = [
//   {
//     id: 1,
//     position: { lat: 24.774265, lng: 46.738586 },
//     image: '/assets/images/logo_white.png', // Replace with the path to the place's image
//     title: 'Place 1', // Title or name of the place
//   },
//   // ... more markers
// ];

// const Map = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0",
//     libraries: ["places"],

//   });

//   const [selectedMarker, setSelectedMarker] = React.useState(null);

//   if (!isLoaded) return "Loading Maps";

//   console.log(selectedMarker, "selectedMarker")

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       center={center}
//       zoom={13}
//       options={options}
//     >
//       {markers.map((marker) => (
//         <Marker
//           key={marker.id}
//           position={marker.position}
//           onClick={() => setSelectedMarker(marker)}
//           icon={{
//             url: '/assets/imgs/Logo_white.png',
//             scaledSize: new window.google.maps.Size(50, 50),
//           }}
//         />
//       ))}

//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div style={{ width: '150px', height: '150px' }}>
//             {/* Custom content that matches your design */}
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// };

// export default Map;

// ++++++++++++++++++++++++++++++++++++++++++

// import React from 'react';
// import { GoogleMap, Marker, InfoWindow, useLoadScript, useGoogleMap } from '@react-google-maps/api';

// const mapContainerStyle = {
//   width: '100vw',
//   height: '100vh',
// };

// const center = {
//   lat: 24.7136,
//   lng: 46.6753,
// };

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };

// const Map = () => {
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

//   console.log(selectedPlace, "selectedPlace")
//   React.useEffect(() => {
//     if (!isLoaded) return;

//     const service = new google.maps.places.PlacesService(mapRef.current);
//     service.nearbySearch(
//       { location: center, radius: 500, type: ['restaurant'] }, // Change these options to what you need
//       (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//           setPlaces(results);
//         }
//       }
//     );
//   }, [isLoaded]);

//   if (!isLoaded) return "Loading Maps";

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       center={center}
//       zoom={13}
//       options={options}
//       onLoad={onMapLoad}
//     >
//       {places.map((place) => (
//         <Marker
//           key={place.place_id}
//           position={place.geometry.location}
//           onClick={() => setSelectedPlace(place)}
//         // You can use a custom icon here if you have one
//         />
//       ))}

//       {selectedPlace && (
//         <InfoWindow
//           position={selectedPlace.geometry.location}
//           onCloseClick={() => setSelectedPlace(null)}
//         >
//           <div>
//             <h2>{selectedPlace.name}</h2>
//             {selectedPlace.photos && selectedPlace.photos.length > 0 && (
//               <img
//                 src={selectedPlace.photos[0].getUrl()} // This assumes that photos are available
//                 alt={selectedPlace.name}
//                 style={{ width: '150px', height: '150px' }}
//               />
//             )}
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// };

// export default Map;
// ++++++++++++++++++++

import React from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import styles from './index.module.scss'
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 24.7136,
  lng: 46.6753,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Function to generate the URL for the place's photo
const getPlacePhotoUrl = (photoReference, maxWidth) => {
  console.log(maxWidth, "maxWidth")
  console.log(photoReference, "photoReference")
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0`;

};

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0",
    libraries: ["places"],
  });

  const mapRef = React.useRef(null);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [places, setPlaces] = React.useState([]);
  const [selectedPlace, setSelectedPlace] = React.useState(null);

  console.log(places, "places")
  console.log(selectedPlace, "selectedPlace")
  React.useEffect(() => {
    if (!isLoaded) return;

    const service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(
      { location: center, radius: 500, type: ['restaurant'] },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaces(results);
        }
      }
    );
  }, [isLoaded]);

  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <div className={styles.map_container}>
        <div className={styles.map}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            options={options}
            onLoad={onMapLoad}
          >
            {places.map((place) => (
              <>
                {
                  console.log(place.photos && place.photos, "photosz")

                }


                <Marker
                  key={place.place_id}
                  position={place.geometry.location}
                  onClick={() => setSelectedPlace(place)}
                  icon={{
                    url: place.photos && place.photos.length > 0 ? getPlacePhotoUrl(place.photos[0].photo_reference, 50) : place.icon,
                    scaledSize: new window.google.maps.Size(50, 50),
                  }}

                />
              </>
            ))}

            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.geometry.location}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div className='detaislssszzzzzzz'>
                  <h2>{selectedPlace.name}</h2>
                  {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                    <img
                      src={getPlacePhotoUrl(selectedPlace.photos[0].html_attributions, 150)} // Adjust size as needed
                      alt={selectedPlace.name}
                      style={{ width: '150px', height: '150px' }}
                    />
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

      </div>

    </>

  );

};

export default Map;
