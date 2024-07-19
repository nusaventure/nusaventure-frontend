import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/libs/api";
import { Category } from "@/types/category";
import { Link, useLoaderData } from "react-router-dom";
import { topDestinations } from "@/libs/topDestination";

export async function loader() {
  const responseHeroCategories = await api<{
    data: Array<Category>;
  }>("/categories/featured");

  return {
    heroCategories: responseHeroCategories.data,
    // topDestinations: [],
  };
}
// topDestinations
export function HomeRoute() {
  const { heroCategories } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <div>
      <header className="fixed w-full p-5 z-20 bg-gradient-to-b from-gray-700/60">
        <div className="flex justify-between">
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
                INDONESIA!
              </h1>
            </div>

            <div className="flex flex-col gap-8">
              <form action="get">
                <Input
                  className="h-16 bg-slate-500/30 text-white text-xl backdrop-blur border-slate-300/30 placeholder:text-white placeholder:text-xl"
                  placeholder="🔍Where do you want to go?"
                />
              </form>

              <ul className=" flex flex-wrap strech  gap-y-2 gap-x-2 ">
                {heroCategories
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

      <section
        id="top-destination"
        className=" w-full h-screen relative z-10 flex flex-col py-8 items-center"
      >
        <div className="absolute w-full h-1/2 inset-0 z-0 -top-[30%]">
          <img
            src="/images/section/vector.png"
            alt="vector"
            className="w-full h-full object-contain bg-cover"
          />
        </div>

        <div className="max-w-screen-xl " >
          <div className="relative z-10 ">
            <p className="text-lg font-semibold text-indigo-600 mb-2">
              Top Destination
            </p>
            <h1 className="text-4xl font-bold text-gray-1000 mb-8">
              Discover Top Destinations
            </h1>
          </div>
          <div className="pt-20 relative z-10 flex justify-center ">
            {topDestinations.map((destination, index) => (
              <div
                key={index}
                className="h-120 min-w-[250px] rounded-lg overflow-hidden"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-contain"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {destination.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="favorite-places"
        className="w-full h-screen relative z-10 flex flex-col items-center py-8 justify-center"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/section/wave-background.png"
            alt="wave background"
            className="w-full h-full bg-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-lg font-semibold text-indigo-600 mb-2">
            Our Places
          </p>
          <h1 className="text-4xl font-bold text-gray-1000 mb-8">
            Favorite Places Curated for You
          </h1>
          <div className="pt-10 flex gap-52 justify-around w-full max-w-4xl">
            <div className="flex flex-col items-center">
              <img
                src="images/section/island.png"
                alt="island"
                className="h-30 w-30 mb-10 object-contain"
              />
              <p className="pt-2 text-5xl font-bold text-[#5338F5]">30</p>
              <h2 className="pt-5 text-2xl font-semibold text-gray-800 mb-4">
                Island
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="images/section/buildings.png"
                alt="building"
                className="h-30 w-30 mb-10 object-contain"
              />
              <p className="pt-2 text-5xl font-bold text-[#5338F5]">102</p>
              <h2 className="pt-5 text-2xl font-semibold text-gray-800 mb-4">
                Cities
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="images/section/location.png"
                alt="location"
                className="h-30 w-30 mb-10 object-contain"
              />
              <p className="pt-2 text-5xl font-bold text-[#5338F5]">2304</p>
              <h2 className="pt-5 text-2xl font-semibold text-gray-800 mb-4">
                Places
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
              <img
                src="images/section/mountain.png"
                alt="mountain"
                className="h-150 w-150 rounded-md shadow-lg object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
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
