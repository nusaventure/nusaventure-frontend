import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { Share, Star, Copy } from "lucide-react";
import { Place } from "@/types/places";
import { cn } from "@/libs/cn";
import api from "@/libs/api";
import { authProvider } from "@/libs/auth";
import NusaVentureLogo from "/images/places/nusa-venture-black.svg";
import PageMeta from "@/components/page-meta";
import { Button, buttonVariants } from "@/components/ui/button";
import { MapboxView } from "@/components/mapbox-view";
import { Input } from "@/components/ui/input";
import { UserNavigation } from "@/components/user-navigation";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type responsePlace = { data: Place };
type responsePlaces = { data: Array<Place> };

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const keyword = new URL(request.url).searchParams.get("q");

  const [responsePlace, responsePlaces, responseTopDestinations] =
    await Promise.all([
      api<responsePlace>(`/places/${params.slug}`),
      api<responsePlaces>(`places?search=${keyword ?? ""}`),
      api<responsePlaces>("/places/featured"),
    ]);

  return {
    keyword: keyword ?? "",
    place: responsePlace.data,
    places: responsePlaces.data,
    topDestinations: responseTopDestinations.data,
    isAuthenticated: authProvider.isAuthenticated,
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  console.log(formData.get("placeId"));

  if (intent === "save-place") {
    await api("/saved-places", {
      method: "post",
      body: {
        placeId: formData.get("placeId"),
      },
    });

    toast.success("Place saved successfully");
  } else if (intent === "remove-saved-place") {
    await api(`/saved-places/${formData.get("savedPlaceId")}`, {
      method: "delete",
    });

    toast.success("Saved places removed successfully");
  }

  return null;
}

export const PlaceDetailIndexRoute = () => {
  const { place, places, isAuthenticated } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  const renderPlaces = places.slice(0, 4);

  const handleCopy = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <PageMeta title="Places" />

      <main className="flex">
        <aside className="w-[1000px] h-screen flex flex-col">
          <PlacesSidebarHeader />
          <ScrollArea>
            <div className="flex flex-col gap-4">
              <div className=" h-[250px] w-full relative ">
                <img
                  className=" w-full h-full object-cover object-center "
                  src={place.imageUrl}
                  alt={place.title}
                />
              </div>
              <div className="mx-4 flex flex-col gap-4">
                <div className="text-2xl font-bold ">{place.title}</div>
                <div>{place.description}</div>
                <div className="flex gap-4">
                  {isAuthenticated ? (
                    place.savedPlaceId ? (
                      <Form method="delete">
                        <input
                          type="hidden"
                          name="savedPlaceId"
                          value={place.savedPlaceId}
                        />
                        <Button
                          size="sm"
                          className="bg-yellow-300 hover:bg-yellow-400"
                          name="intent"
                          value="remove-saved-place"
                        >
                          <Star fill="black" className="h-4 w-4 mr-1" />
                          Saved
                        </Button>
                      </Form>
                    ) : (
                      <Form method="post">
                        <input type="hidden" name="placeId" value={place.id} />
                        <Button
                          size="sm"
                          className="bg-yellow-300 hover:bg-yellow-400"
                          name="intent"
                          value="save-place"
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Save Place
                        </Button>
                      </Form>
                    )
                  ) : (
                    <Link
                      to={`/login?redirect=/places/${place.slug}`}
                      className={cn(
                        buttonVariants({
                          variant: "default",
                        }),
                        "bg-yellow-300 hover:bg-yellow-400"
                      )}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Save Place
                    </Link>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className={cn(
                          buttonVariants({
                            variant: "secondary",
                          }),
                          "bg-[#E6E6E6] text-black"
                        )}
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Share Place
                        </DialogTitle>
                        <DialogDescription>Link for sharing</DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="link"
                            defaultValue={window.location.href}
                            readOnly
                          />
                        </div>
                        <Button
                          onClick={handleCopy}
                          type="submit"
                          size="sm"
                          className="px-3"
                        >
                          <span className="sr-only">Copy</span>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <hr className="my-6" />
            </div>
            <div className="mx-4">
              <h2 className="font-bold text-lg mb-2">Another Destination</h2>
              <div className="grid grid-cols-4 gap-4 w-full">
                {renderPlaces.map((item) => (
                  <Link
                    to={`/places/${item.slug}`}
                    key={item.id}
                    className="overflow-hidden"
                  >
                    <div>
                      <div
                        className="w-full h-[120px] relative mb-2"
                        key={item.id}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>
                      <p className="text-center text-sm">{item.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollArea>
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
};

function PlacesSidebarHeader() {
  const { keyword } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <header className="p-4 flex justify-between items-center gap-6">
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
    </header>
  );
}
