import PageMeta from "@/components/page-meta";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import NusaVentureLogo from "/images/places/nusa-venture-black.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapboxView } from "@/components/mapbox-view";
import emptyImage from "/images/saved-places/empty.png";
import api from "@/libs/api";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { HeaderNavigationMenu } from "@/components/header-navigation";
import { SavedPlace } from "@/types/saved-places";
import { authGuard } from "@/libs/middleware";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = await authGuard(url.pathname);

  if (redirectTo) {
    return redirect(redirectTo);
  }

  const savedPlaces = await api<{
    data: Array<SavedPlace>;
  }>("/saved-places");

  return {
    savedPlaces: savedPlaces.data,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await api(`/saved-places/${formData.get("id")}`, {
    method: "delete",
  });

  toast.success("Saved places removed successfully");

  return null;
}

export function DashboardRoute() {
  const { savedPlaces } = useLoaderData() as { savedPlaces: SavedPlace[] };
  const places = savedPlaces.map(item => item.place)

  return (
    <>
      <PageMeta title="Saved Places" />

      <main className="flex">
        <aside className="w-[1000px] h-screen flex flex-col">
          <PlacesSidebarHeader />

          <div className="p-6 h-[85%]">
            <h1 className="text-2xl">Saved Places</h1>
            <PlaceDetailPlaceholder savedPlaces={savedPlaces} />
          </div>
        </aside>
        <div className="flex flex-col w-full">
          <div className="pt-3 pr-5 place-self-end fixed z-20 flex ">
            <HeaderNavigationMenu />
          </div>
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

function PlaceDetailPlaceholder({ savedPlaces }: { savedPlaces: Array<SavedPlace> }) {
  return (
    <div className="h-[100%]">
      {savedPlaces.length > 0 ? (
        <ScrollArea className="h-[100%] mt-4">
          {savedPlaces.map((savedPlace) => (
            <div
              className="flex flex-row gap-4 mb-4 min-h-[145px] w-full"
              key={savedPlace.id}
            >
              <Link to={`/places/${savedPlace.place.slug}`}>
                <img
                  className="object-cover rounded-lg w-[198px] h-[145px]"
                  src={savedPlace.place.imageUrl}
                  alt={savedPlace.place.title}
                />
              </Link>

              <div className="flex flex-col gap-2 flex-1 items-start overflow-hidden">
                <Link to={`/places/${savedPlace.place.slug}`}>
                  <span className="text-xl font-bold hover:underline">
                    {savedPlace.place.title}
                  </span>
                </Link>

                <div className="flex flex-row gap-4 ">
                  {savedPlace.place.categories.map((category, index) => (
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
                  {savedPlace.place.description}
                </p>
                <p className="text-sm font-medium text-gray-500 truncate text-ellipsis max-w-[390px]">
                  {savedPlace.place.address}
                </p>
                <Form method="delete">
                  <input type="hidden" name="id" value={savedPlace.id} />
                  <Button
                    size="sm"
                    className="bg-yellow-300 hover:bg-yellow-400"
                  >
                    <Star fill="black" className="h-4 w-4 mr-1" />
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
