import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function MapExampleRoute() {
  const places = [
    { latitude: -6.1753924, longitude: 106.8271528, name: "Monas" },
    {
      latitude: -6.1762405,
      longitude: 106.82725,
      name: "National Museum Gallery",
    },
    { latitude: -6.1741286, longitude: 106.8284033, name: "Istiqlal Mosque" },
  ];

  return (
    <div>
      <MapboxMap
        coordinate={{
          latitude: -6.1753924,
          longitude: 106.8271528,
          zoom: 14,
        }}
        places={places}
      />
    </div>
  );
}

interface MapboxMapProps {
  coordinate: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  places: { latitude: number; longitude: number; name: string }[];
}

export function MapboxMap({
  coordinate = {
    latitude: -6.1753924,
    longitude: 106.8271528,
    zoom: 14,
  },
  places,
}: MapboxMapProps) {
  const [hoveredPlace, setHoveredPlace] = useState<null | {
    latitude: number;
    longitude: number;
    name: string;
  }>(null);

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={coordinate}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {places.map((place, index) => (
        <Marker
          key={index}
          longitude={place.longitude}
          latitude={place.latitude}
          anchor="bottom"
        >
          <img
            src="/images/pin.png"
            width={30}
            height={20}
            alt={place.name}
            onMouseEnter={() => setHoveredPlace(place)}
            onMouseLeave={() => setHoveredPlace(null)}
            style={{ cursor: "pointer" }}
          />
        </Marker>
      ))}

      {hoveredPlace && (
        <Popup
          longitude={hoveredPlace.longitude}
          latitude={hoveredPlace.latitude}
          anchor="top"
          closeButton={false}
        >
          <div>{hoveredPlace.name}</div>
        </Popup>
      )}
    </Map>
  );
}
