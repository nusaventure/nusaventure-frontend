import api from "@/libs/api";
import { useLoaderData } from "react-router-dom";

type Country = {
  id: string;
  name: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

export async function loader() {
  const res = await api<{
    data: Array<Country>;
  }>("/countries");

  return { countries: res.data };
}

export function PlacesRoute() {
  const { countries } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <select name="countryId" id="countryId">
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
}
