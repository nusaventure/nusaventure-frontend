import { useLoaderData } from "react-router-dom";

export async function loader() {
  const responseAbout = "/about";

  return { places: responseAbout };
}

export function AboutRoute() {
  return <div>this is about</div>;
}
