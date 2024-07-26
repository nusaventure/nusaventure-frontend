import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
} from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/libs/api";
import { Category } from "@/types/category";
import { Island } from "@/types/islands";
import { FeaturedPlace } from "@/types/places";
import { authProvider } from "@/libs/auth";
import { cn } from "@/libs/cn";

export async function loader() {
  const [
    responseHeroCategories,
    responseTopDestinations,
    responseIslands,
    responsePlaceTopStats,
  ] = await Promise.all([
    api<{ data: Array<Category> }>("/categories/featured"),
    api<{ data: Array<FeaturedPlace> }>("/places/featured"),
    api<{ data: Array<Island> }>("/islands"),
    api<{ data: { islands: number; cities: number; places: number } }>(
      "/places/top-stats"
    ),
  ]);

  return {
    heroCategories: responseHeroCategories.data,
    topDestinations: responseTopDestinations.data,
    placeTopStats: responsePlaceTopStats.data,
    placeIslands: responseIslands.data,
    isAuthenticated: authProvider.isAuthenticated,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    authProvider.logout();
    return redirect("/");
  }

  return null;
}

export function HomeRoute() {
  const {
    heroCategories,
    topDestinations,
    placeTopStats,
    placeIslands,
    isAuthenticated,
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <header className="fixed w-full p-5 z-20 bg-gradient-to-b from-gray-700/60 justify-center flex ">
        <div className="max-w-screen-xl w-full">
          <div className="flex justify-between ">
            <div>
              <Link to="/">
                <img src="/images/landing/logo.svg" alt="logo" />
              </Link>
            </div>
            <div>
              <Button className="text-white">
                <Link to="/places">Places</Link>
              </Button>
              <Button className="text-white">
                <Link to="/about">About</Link>
              </Button>
              {isAuthenticated ? (
                <Form method="post" action="/" className="inline">
                  <Button
                    name="intent"
                    value="logout"
                    className="bg-primary-color text-white"
                  >
                    Logout
                  </Button>
                </Form>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({
                      variant: "default",
                    }),
                    "bg-primary-color text-white"
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <section
        id="hero"
        className="bg-[url('/images/landing/hero_banner.webp')] bg-cover bg-fixed h-screen relative "
      >
        <div className="flex justify-center content-center items-center h-screen ">
          <div className="flex lg:max-w-5xl max-w-3xl  flex-col gap-6 items-center lg:flex-row px-5  ">
            <div>
              <h1 className="londrina-solid-regular text-white text-6xl lg:text-8xl text-center md:text-left ">
                EXPLORE INDONESIA!
              </h1>
            </div>

            <div className="flex flex-col gap-6">
              <Form method="get" action="/places">
                <Input
                  className="h-12 bg-slate-500/30 text-white text-base backdrop-blur border-slate-300/30 placeholder:text-white placeholder:text-base"
                  placeholder="🔍 Where do you want to go?"
                  type="search"
                  name="q"
                />
              </Form>

              <ul className="flex flex-wrap strech gap-2">
                {heroCategories.map((heroCategory) => (
                  <li key={heroCategory.id}>
                    <Link
                      to={`/places?q=${heroCategory.slug}`}
                      className="block py-1 px-3 text-white rounded bg-slate-500/30 text-[12px] backdrop-blur border border-slate-300/30"
                    >
                      {heroCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 lg:-bottom-20 pointer-events-none">
          <img
            src="/images/section/cloud.webp"
            alt="cloud"
            className="w-screen "
          />
        </div>
      </section>

      <section
        id="top-destination"
        className=" w-full z-10 relative flex flex-col py-8 items-center"
      >
        <div className="max-w-screen-xl px-5 ">
          <div className=" ">
            <p className="text-lg font-semibold text-indigo-600 mb-2">
              Top Destination
            </p>
            <h1 className="text-4xl font-bold text-gray-1000 mb-8">
              Discover Top Destinations
            </h1>
          </div>
          <div className=" gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {topDestinations
              .filter((_, index) => index <= 5)
              .map((destination) => (
                <Link
                  to={`/places/${destination.slug}`}
                  key={destination.id}
                  className="overflow-hidden"
                >
                  <img
                    src={destination.imageUrl}
                    alt={destination.title}
                    className="object-cover rounded-lg h-96 w-full md:w-96"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      {destination.title}, {destination.city.name}
                    </h2>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section
        id="favorite-places"
        className="flex flex-col items-center justify-center bg-[url('/images/section/bg-sea.svg')] bg-cover bg-no-repeat bg-center px-5 w-auto h-screen"
      >
        <header>
          <h1 className="text-lg font-semibold text-white mb-2">Our Places</h1>
          <h2 className="text-4xl font-bold text-white mb-8">
            Favorite Places Curated for You
          </h2>
        </header>

        <div className="pt-10 flex justify-around w-screen max-w-4xl ">
          <div className="flex flex-col items-center">
            <img
              src="images/section/island.png"
              alt="island"
              className="h-24 md:h-36 mb-10"
            />
            <p className="pt-2 text-5xl font-bold text-white">
              {placeTopStats.islands}
            </p>
            <h2 className="pt-5 text-2xl font-semibold text-white mb-4">
              Islands
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="images/section/buildings.png"
              alt="building"
              className="h-24 md:h-36 mb-10"
            />
            <p className="pt-2 text-5xl font-bold text-white">
              {placeTopStats.cities}
            </p>
            <h2 className="pt-5 text-2xl font-semibold text-white mb-4">
              Cities
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="images/section/location.png"
              alt="location"
              className="h-24 md:h-36 mb-10"
            />
            <p className="pt-2 text-5xl font-bold text-white">
              {placeTopStats.places}
            </p>
            <h2 className="pt-5 text-2xl font-semibold text-white mb-4">
              Places
            </h2>
          </div>
        </div>
      </section>

      <section id="island" className="flex px-5 lg:py-10 justify-center">
        <div className="max-w-screen-xl ">
          <div className=" ">
            <p className="text-lg font-semibold text-indigo-600 mb-2">
              Islands Coverage
            </p>
            <h1 className="text-4xl font-bold text-gray-1000 mb-8">
              Explore Beautiful Islands of Indonesia
            </h1>
          </div>
          <div className="pt-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {placeIslands.map((island, index) => (
              <Link
                to={`/places/${island.name}`}
                key={index}
                className=" relative"
              >
                <img
                  src={island.imageUrl}
                  alt={island.name}
                  className="object-cover rounded-lg h-36 w-screen"
                />

                <div className="flex justify-center absolute  inset-x-1/2 bottom-1/3">
                  <h2 className="text-2xl md:text-3xl text-white uppercase font-semibold text-gray-800">
                    {island.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className=" px-5 py-20 flex justify-center ">
        <div className="max-w-screen-xl ">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className=" flex justify-center ">
              <img
                src="images/section/mountain.png"
                alt="mountain"
                className="flex-1 rounded-md shadow-lg object-cover w-screen h-96 lg:w-auto lg:h-auto"
              />
            </div>
            <div className="flex-1 ">
              <p className="text-lg font-semibold text-indigo-600 mb-2">
                Our Features
              </p>
              <h1 className="text-4xl font-bold text-gray-1000 mb-8">
                Get Ready for Your Next Destination
              </h1>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Explore Destination via Maps
                </h2>
                <p className="text-gray-600">
                  Offers a seamless way to navigate, discover, and plan your
                  travels. Our interactive maps highlight key attractions, local
                  amenities, and hidden gems, ensuring an enriching travel
                  experience.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Trip Planner
                </h2>
                <p className="text-gray-600">
                  Simplifies organizing your travels with easy itinerary
                  creation, accommodation bookings, and discovery of top
                  attractions. Plan confidently and enjoy every aspect of your
                  journey with our comprehensive tool.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Share Your Plan Trip
                </h2>
                <p className="text-gray-600">
                  Makes it easy to share your travel itineraries with friends
                  and family. Stay connected and make group travel planning
                  simple and fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
