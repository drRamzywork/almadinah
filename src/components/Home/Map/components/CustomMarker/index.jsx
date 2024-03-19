
import Rectangle from '../../Rectangle';
import styles from './index.module.scss'
const CustomMarker = ({ imageUrl, location, center }) => {

  const onMarkerClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(directionsUrl, '_blank');
  };
  return (
    <div
      onClick={onMarkerClick}

      id={styles.mapMark}>
      <img src={imageUrl}
        onClick={onMarkerClick}
      />

      <div className={styles.arrow_container}>
        <Rectangle />
      </div>
    </div>
  );
};

export default CustomMarker;
