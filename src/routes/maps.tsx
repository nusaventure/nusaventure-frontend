import api from "@/libs/api";
import { Place } from "@/types/places";
import { useLoaderData } from "react-router-dom";

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type responsePlaces = { data: Array<Place> };

export async function loader() {
  const responsePlaces = await api<responsePlaces>(`/places`);

  return {
    places: responsePlaces.data,
  };
}

export function MapsRoute() {
  const { places } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1>Maps</h1>
      <p>{mapboxAccessToken}</p>
      <pre>{JSON.stringify(places, null, 2)}</pre>
    </div>
  );
}
