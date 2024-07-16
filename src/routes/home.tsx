import api from "@/libs/api";
import { Category } from "@/types/category";
import { useLoaderData } from "react-router-dom";

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
      <section id="hero" className="bg-stone-800 p-10">
        <h1>Home</h1>

        <div>
          <p>Where do you want to go?</p>

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
      </section>

      <pre>
        {JSON.stringify(
          {
            topDestinations,
            favoritePlaces,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
