import { useLoaderData } from "react-router-dom";

import api from "@/libs/api";
import { Country } from "@/types/country";

export async function loader() {
  const res = await api<{
    data: Array<Country>;
  }>("/places");

  return { places: res.data };
}

export function PlacesIndexRoute() {
  const { places } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <h1>Places</h1>
      <pre>{JSON.stringify(places, null, 2)}</pre>
    </>
  );
}
