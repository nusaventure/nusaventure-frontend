import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Place } from "@/types/places";
import {
  Form,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/libs/api";
import PageMeta from "@/components/page-meta";
import { authProvider } from "@/libs/auth";
import { UserNavigation } from "@/components/user-navigation";
import { cn } from "@/libs/cn";
import { MapboxView } from "@/components/mapbox-view";
import { Button } from "@/components/ui/button";

import NusaVentureLogo from "/images/places/nusa-venture-black.svg";

type responsePlaces = { data: Array<Place> };

export async function loader({ request }: LoaderFunctionArgs) {
  const keyword = new URL(request.url).searchParams.get("q");
  const filter = new URL(request.url).searchParams.get("filter");

  const [responsePlaces, responseTopDestinations] = await Promise.all([
    api<responsePlaces>(`places?search=${keyword ?? ""}`),
    api<responsePlaces>("/places/featured"),
  ]);

  return {
    keyword: keyword ?? "",
    filter: filter ?? "",
    places: responsePlaces.data,
    topDestinations: responseTopDestinations.data,
    isAuthenticated: authProvider.isAuthenticated,
  };
}

export function PlacesIndexRoute() {
  const { places, keyword, topDestinations, filter, isAuthenticated } =
    useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <PageMeta title="Places" />

      <main className="flex">
        <aside className="w-[1000px] h-screen flex flex-col">
          <PlacesSidebarHeader />

          <div className="p-6 h-[85%]">
            <PlaceDetailPlaceholder
              places={places}
              keyword={keyword}
              topDestinations={topDestinations}
              filter={filter}
            />
          </div>
        </aside>
        <div className="flex flex-col w-full">
          <div className=" pt-3 pr-5 place-self-end fixed z-20 flex ">
            <Button className="text-white">
              <Link to="/places">Places</Link>
            </Button>
            <Button className="text-white">
              <Link to="/about">About</Link>
            </Button>
            <nav>
              {isAuthenticated ? (
                <UserNavigation />
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
            </nav>
          </div>
          <MapboxView places={places} />
        </div>
      </main>
    </>
  );
}

function PlacesSidebarHeader() {
  const { keyword, isAuthenticated } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <header className="px-6 py-4 flex justify-between items-center gap-6">
      <Link to="/">
        <img src={NusaVentureLogo} alt="Nusa Venture" className="h-10" />
      </Link>

      <Form method="get" action="/places" className="w-full">
        <Input
          type="search"
          name="q"
          placeholder="Search places..."
          defaultValue={keyword}
          className="focus-visible:ring-0 bg-neutral-200 focus-visible:ring-transparent"
        />
      </Form>

      <nav>
        {isAuthenticated ? (
          <UserNavigation />
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
      </nav>
    </header>
  );
}

function PlaceDetailPlaceholder({
  places,
  keyword,
  topDestinations,
  filter,
}: {
  places: Place[];
  keyword: string;
  topDestinations: Place[];
  filter: string;
}) {
  const placeList =
    keyword !== "" || filter === "all-destinations" ? places : topDestinations;

  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    navigate(`/places?filter=${value}`);
  };

  return (
    <div className="h-[100%]">
      <Select
        onValueChange={handleSelectChange}
        defaultValue={filter === "" ? "top-destinations" : filter}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="top-destinations">Top Destinations</SelectItem>
          <SelectItem value="all-destinations">All Destinations</SelectItem>
        </SelectContent>
      </Select>

      {placeList.length > 0 ? (
        <ScrollArea className="h-[100%] mt-4">
          {placeList.map((place) => (
            <div
              className="flex flex-row gap-4 mb-4 min-h-[145px] w-full"
              key={place.id}
            >
              <Link to={`/places/${place.slug}`}>
                <img
                  className="object-cover rounded-lg w-[198px] h-[145px]"
                  src={place.imageUrl}
                  alt={place.title}
                />
              </Link>

              <div className="flex flex-col gap-2 flex-1 items-start overflow-hidden">
                <Link to={`/places/${place.slug}`}>
                  <span className="text-xl font-bold hover:underline">
                    {place.title}
                  </span>
                </Link>

                <div className="flex flex-row gap-4 ">
                  {place.categories.map((category, index) => (
                    <Link
                      to={`/places?q=${category.name}`}
                      key={index}
                      className="px-[10px] py-[5px] bg-blue-200 rounded-3xl hover:bg-blue-300"
                    >
                      <p className="font-bold text-xs text-blue-600">
                        {category.name}
                      </p>
                    </Link>
                  ))}
                </div>

                <p className="text-sm font-medium text-gray-500 truncate text-ellipsis max-w-[390px]">
                  {place.description}
                </p>
                <p className="text-sm font-medium text-gray-500 truncate text-ellipsis max-w-[390px]">
                  {place.address}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="font-medium text-md">
            Sorry, we couldn't find the location you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
