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
              <img src="/images/landing/logo.svg" alt="logo" />
            </Link>
          </div>
          <Button className="bg-primary-color text-white">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </header>

      <section
        id="hero"
        className="bg-[url('/images/landing/hero_banner.webp')] bg-cover min-h-screen bg-fixed "
      >
        <div className="flex justify-center content-center items-center h-screen ">
          <div className="flex w-8/12	 gap-6 items-center">
            <div>
              <h1 className="londrina-solid-regular text-white text-9xl">
                EXPLORE
              </h1>
              <h1 className="londrina-solid-regular text-white text-9xl">
                NDONESIA!
              </h1>
            </div>

            <div className="flex flex-col gap-8">
              <form action="get">
              <Input  className="h-16 bg-slate-500/30 text-white text-xl backdrop-blur border-slate-300/30 placeholder:text-white placeholder:text-xl" placeholder="🔍Where do you want to go?"/>
              
              </form>
                
              
              <ul className=" flex flex-wrap strech  gap-y-2 gap-x-2 ">
                {heroCategories
                  .filter((_, index) => index <= 8)
                  .map((heroCategory) => (
                    <li key={heroCategory.id}>
                      <button className="py-2 px-4 text-white rounded bg-slate-500/30 text-sm backdrop-blur border border-slate-300/30">
                        {heroCategory.name}
                      </button>
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
