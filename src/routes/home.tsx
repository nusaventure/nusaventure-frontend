import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <div>
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
          </div>
          <Button>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </header>

      <section
        id="hero"
        className="bg-[url('images/hero-banner.webp')] bg-cover min-h-screen bg-fixed "
      >
        <div className="flex justify-center content-center items-center h-screen ">
          <div className="flex w-7/12	 gap-6 items-center">
            <div>
              <h1 className="londrina-solid-regular text-white text-8xl">
                EXPLORE
              </h1>
              <h1 className="londrina-solid-regular text-white text-8xl">
                NDONESIA!
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                className="h-12"
                placeholder="Where do you want to go?"
              ></Input>
              <ul className=" flex flex-wrap strech justify-between gap-y-5">
                {heroCategories
                  .filter((_, index) => index <= 10)
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
