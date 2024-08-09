import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { Place } from "@/types/places";
import api from "@/libs/api";
import PageMeta from "@/components/page-meta";
import { MapboxView } from "@/components/mapbox-view";
import { ScrollArea } from "@/components/ui/scroll-area";

type responsePlace = { data: Place };

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  const responsePlace = await api<responsePlace>(`places/${slug}`);
  return responsePlace.data;
}

export default function PlaceSlugRoute() {
  const place = useLoaderData() as Place;

  return (
    <>
      <PageMeta title={place.title} />

      <main className="flex">
        <aside className="w-[720px] h-screen flex flex-col">
          <div className="p-6 h-[85%]">
            <PlaceDetail place={place} />
          </div>
        </aside>

        <MapboxView places={[place]} />
      </main>
    </>
  );
}

function PlaceDetail({ place }: { place: Place }) {
  return (
    <ScrollArea className="h-[100%]">
      <div className="flex flex-col gap-4">
        <img
          className="object-cover rounded-lg w-full h-[350px]"
          src={place.imageUrl}
          alt={place.title}
        />

        <h1 className="text-3xl font-bold">{place.title}</h1>

        <div className="flex flex-row gap-4 mb-4">
          {place.categories.map((category, index) => (
            <div
              key={index}
              className="px-[10px] py-[5px] bg-blue-200 rounded-3xl"
            >
              <p className="font-bold text-xs text-blue-600">{category.name}</p>
            </div>
          ))}
        </div>

        <p className="text-lg font-medium text-gray-700">{place.description}</p>
        <p className="text-md font-medium text-gray-500">{place.address}</p>
      </div>
    </ScrollArea>
  );
}
