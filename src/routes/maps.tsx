import { useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Map,
  Source,
  Layer,
  type MapRef,
  type GeoJSONSource,
} from "react-map-gl";

import api from "@/libs/api";
import { Place } from "@/types/places";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/configs/layers";

import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJSONFeature } from "mapbox-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type responsePlaces = { data: Array<Place> };

export async function loader() {
  const responsePlaces = await api<responsePlaces>(`/places`);

  return {
    places: responsePlaces.data,
  };
}

type FeatureProperties = {
  type: "Place";
  id: string;
  title: string;
  slug: string;
};

export function MapsRoute() {
  const { places } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const geojson = {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      properties: {
        type: "Place",
        id: place.id,
        title: place.title,
        slug: place.slug,
      },
      geometry: {
        type: "Point",
        coordinates: [place.longitude, place.latitude],
      },
    })),
  };

  return (
    <div className="h-screen">
      <MapboxView geojson={geojson as any}></MapboxView>
    </div>
  );
}

export function MapboxView({ geojson }: { geojson: any }) {
  const navigate = useNavigate();

  const mapRef = useRef<MapRef>(null);

  const onClick = (event: any) => {
    if (!mapRef.current) return;

    const features = event.features as GeoJSONFeature[];
    if (!features.length) return;

    const feature = features[0];
    const clusterId = feature.properties?.cluster_id;
    const featureProperties = feature.properties as FeatureProperties;

    const isPropertiesTypePlace = featureProperties.type === "Place";

    if (isPropertiesTypePlace) {
      // Redirect
      navigate(`/places/${featureProperties.slug}`);
    }

    const mapboxSource = mapRef.current.getSource(
      "places-source"
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !mapRef.current) return;
      if (!zoom) return;

      const geometry = feature.geometry;

      if (geometry.type === "Point") {
        const coordinates = geometry.coordinates as [number, number];
        mapRef.current.easeTo({
          center: coordinates,
          zoom: zoom,
        });
      }
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: -0.4752106,
        longitude: 116.6995672,
        zoom: 4.75,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[
        String(clusterLayer.id),
        String(unclusteredPointLayer.id),
      ]}
      onClick={onClick}
      ref={mapRef}
    >
      <Source
        id="places-source"
        type="geojson"
        data={geojson}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
}
