import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function MapExampleRoute() {
  return (
    <div className="flex">
      <div className="w-1/3 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <img
            src="/images/landing/logo.svg"
            alt="Nusa Venture"
            className="h-10"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Tanah Lot Temple, Bali</h2>
        <p className="mb-4">
          Tanah Lot Temple is one of the most sacred temples in Bali, Indonesia.
          Here there are two temples located on large rocks. One is located on a
          boulder and the other is located on a cliff similar to Uluwatu Temple.
          Tanah Lot Temple is part of Dang Kahyangan Temple.
        </p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md mb-6">
          Add to Trip Planner
        </button>
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

      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          latitude: -8.409518, // Latitude for Bali
          longitude: 115.188919, // Longitude for Bali
          zoom: 10,
        }}
        style={{ width: "70%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default MapExampleRoute;
