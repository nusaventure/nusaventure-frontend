import PageMeta from "@/components/page-meta";
import {
  ActionFunctionArgs,
  Form,
  Link,
  useLoaderData,
} from "react-router-dom";
import NusaVentureLogo from "/images/places/nusa-venture-black.svg";
import { Place } from "@/types/places";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapboxView } from "@/components/mapbox-view";
import emptyImage from "/images/saved-places/empty.png";
import api from "@/libs/api";
import { Button } from "@/components/ui/button";
import starIcon from "/images/saved-places/star.svg";
import { toast } from "react-toastify";

export async function loader() {
  const places = await api<{
    data: Array<Place>;
  }>("/places");

  return {
    places: places.data,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData.get("placeId"));

  // await api("/saved-places", {
  //   method: "delete",
  //   body: {
  //     placeId: formData.get("placeId"),
  //   },
  // });

  toast.success("Saved places removed");

  return null;
}

export function SavedPlacesRoute() {
  const { places } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <PageMeta title="Saved Places" />

      <main className="flex">
        <aside className="w-[1000px] h-screen flex flex-col">
          <PlacesSidebarHeader />

          <div className="p-6 h-[85%]">
            <h1 className="text-2xl">Saved Places</h1>
            <PlaceDetailPlaceholder places={places} />
          </div>
        </aside>
        <div className="flex flex-col w-full">
          <MapboxView places={places} />
        </div>
      </main>
    </>
  );
}

function PlacesSidebarHeader() {
  return (
    <header className="px-6 py-4 flex justify-between items-center gap-6">
      <Link to="/">
        <img src={NusaVentureLogo} alt="Nusa Venture" className="h-10" />
      </Link>
    </header>
  );
}

function PlaceDetailPlaceholder({ places }: { places: Place[] }) {
  return (
    <div className="h-[100%]">
      {places.length > 0 ? (
        <ScrollArea className="h-[100%] mt-4">
          {places.map((place) => (
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
                <Form method="delete">
                  <input type="hidden" name="placeId" value={place.id} />
                  <Button
                    size="sm"
                    className="bg-yellow-300 hover:bg-yellow-400 flex gap-1"
                  >
                    <img src={starIcon} alt="star" />
                    Saved
                  </Button>
                </Form>
              </div>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img src={emptyImage} alt="empty" />
          <h3 className="mt-4 text-xl">Saved Places is empty</h3>
        </div>
      )}
    </div>
  );
}
