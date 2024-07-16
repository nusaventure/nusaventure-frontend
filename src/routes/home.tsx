import api from "@/libs/api";
import { Category } from "@/types/category";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const responseHeroCategories = await api<{
    data: Array<Category>;
  }>("/categories");

  return {
    heroCategories: responseHeroCategories.data,
    topDestinations: [],
    favoritePlaces: [],
  };
}

export function HomeRoute() {
  const { heroCategories, topDestinations, favoritePlaces } =
    useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <header className="fixed w-full p-5">
        <div className="flex  justify-between">
          <h1>
            <Link to="/">🏝️NUSAVENTURE</Link>
          </h1>
          <h1>
            <Link to="/">Home</Link>
          </h1>
        </div>
      </header>

      <section
        id="hero"
        className="bg-[url('/hero-banner.webp')] bg-cover min-h-screen bg-fixed "
      >
        <div className="flex justify-center content-center items-center h-screen">
          <h1>Home</h1>
          <div>
            <h1>EXPLORE INDONESIA! </h1>

            <input placeholder="Where do you want to go?"></input>
            <ul>
              {heroCategories
                .filter((_, index) => index <= 9)
                .map((heroCategory) => (
                  <li key={heroCategory.id}>
                    <span className="p-2 border-white rounded bg-white">
                      {heroCategory.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="top-destinations">
        <p>TOP DESTINATIONS</p>
        <pre>{JSON.stringify(topDestinations, null, 2)}</pre>
      </section>

      <section id="favorite-places">
        <p>FAVORITE PLACES</p>
        <pre>{JSON.stringify(favoritePlaces, null, 2)}</pre>
      </section>

      <section id="features">
        <p>FEATURES</p>
      </section>
    </div>
  );
}
