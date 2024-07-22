import Map, { Source } from "react-map-gl";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Layer from "react-map-gl/dist/esm/components/layer";

import api from "@/libs/api";
import { ScrollArea } from "@/components/ui/scroll-area";

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export async function loader() {
  const responsePlaces = await api<{
    data: Array<{
      id: string;
      title: string;
      latitude: number;
      longitude: number;
      imageUrl: string;
    }>;
  }>("/places");

  return { places: responsePlaces.data };
}

export function PlacesIndexRoute() {
  const { places } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const geojson = {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      properties: {
        title: place.title,
        id: place.id,
      },
      geometry: {
        type: "Point",
        coordinates: [place.longitude, place.latitude],
      },
    })),
  };

  const clusterLayer = {
    id: "clusters",
    type: "circle" as const,
    source: "places",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#4b0082", // Indigo color
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  };

  const clusterCountLayer = {
    id: "cluster-count",
    type: "symbol" as const,
    source: "places",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-color": "#ffffff", // White color for the text
    },
  };

  const unclusteredPointLayer = {
    id: "unclustered-point",
    type: "circle" as const,
    source: "places",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#4b0082", // Indigo color
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  };

  return (
    <main className="flex">
      <ScrollArea className="h-screen w-1/3 fixed top-0 left-0">
        <aside>
          <PlacesSidebarHeader />
          <div className="bg-stone-100 p-4">
            <PlaceDetailPlaceholder />
            <AnotherDestinations />
          </div>
        </aside>
      </ScrollArea>

      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          latitude: -0.4752106,
          longitude: 116.6995672,
          zoom: 4.75,
        }}
        style={{ width: "70%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source
          id="places"
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
    </main>
  );
}

function PlacesSidebarHeader() {
  return (
    <header className="bg-stone-400 p-2 flex justify-between items-center">
      <img src="/images/landing/logo.svg" alt="Nusa Venture" className="h-10" />
      <nav>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

function PlaceDetailPlaceholder() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Example</h2>
      <p className="mb-4">
        Example detail Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Praesentium quia quidem mollitia velit provident quasi error? Nemo
        distinctio, alias fugit tenetur facere neque quidem optio, at commodi
        maiores doloribus asperiores?
      </p>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md mb-6">
        Add to Trip Planner
      </button>
    </div>
  );
}

function AnotherDestinations() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Another Destination</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <img
            src="/images/top-destination/tugu-yogyakarta.png"
            alt="Yogyakarta"
            className="rounded-md mb-2"
          />
          <p>Yogyakarta</p>
        </div>
        <div className="text-center">
          <img
            src="/images/top-destination/tanah-lot.png"
            alt="Bali"
            className="rounded-md mb-2"
          />
          <p>Bali</p>
        </div>
        <div className="text-center">
          <img
            src="/images/top-destination/gedung-sate.png"
            alt="Bandung"
            className="rounded-md mb-2"
          />
          <p>Bandung</p>
        </div>
        <div className="text-center">
          <img
            src="/images/top-destination/bundaran-hi.png"
            alt="Jakarta"
            className="rounded-md mb-2"
          />
          <p>Jakarta</p>
        </div>
      </div>
    </div>
  );
}
