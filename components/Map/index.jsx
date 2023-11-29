import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import { mapStyles } from "@/utils/mapStyle";

const googleMapsApiKey = `AIzaSyDMdBR4AKCkV5kx-Pe-ytC8tOP8YUmC67c`;

const mapContainerStyle = {
  width: "600px",
  height: "100%",
};

const Map = ({ lat, lng }) => {
  const center = { lat, lng };

  const [map, setMap] = React.useState(null);

  const customIcon = {
    url: "/images/pin.png", // path to your custom pin or image
    scaledSize: new window.google.maps.Size(40, 40), // adjust the width and height as needed
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  if (!isLoaded) return <></>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        disableDefaultUI: true, // a way to quickly hide all controls
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: false,
        minZoom: 15,
        maxZoom: 15,
        zoom: 16,
        styles: mapStyles,
      }}
    >
      <MarkerF position={center} icon={customIcon} />
    </GoogleMap>
  );
};

export default React.memo(Map);
