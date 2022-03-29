import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const noop = (value: any) => {};

function ConvertBounds(leafletBounds) {
  const sw = leafletBounds.getSouthWest();
  const ne = leafletBounds.getNorthEast();

  return {
    sw: {
      lat: sw.lat,
      lon: sw.lng,
    },
    ne: {
      lat: ne.lat,
      lon: ne.lng,
    },
  };
}

function EventListener({ onBoundsChange = noop }) {
  const map = useMapEvents({
    move() {
      onBoundsChange(ConvertBounds(map.getBounds()));
    },
    zoom() {
      onBoundsChange(ConvertBounds(map.getBounds()));
    },
  });

  useEffect(() => {
    onBoundsChange(ConvertBounds(map.getBounds()));
  }, [map, onBoundsChange]);

  return null;
}

export default function Map({
  height = 200,
  zoom = 13,
  markers = [],
  lat = 0,
  lon = 0,
  onBoundsChange = noop,
}) {
  return (
    <MapContainer
      style={{ height }}
      center={[lat, lon]}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(({ key, lat, lon, text }) => (
        <Marker key={key} position={[lat, lon]}>
          <Popup>{text}</Popup>
        </Marker>
      ))}
      <EventListener onBoundsChange={onBoundsChange} />
    </MapContainer>
  );
}
