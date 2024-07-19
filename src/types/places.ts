export type Place = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  country: {
    id: string | number;
    name: string;
  };
  state: {
    id: string | number;
    name: string;
  };
  city: {
    id: string | number;
    name: string;
  };
  categories: [
    {
      id: string;
      slug: string;
      name: string;
    }
  ];
};

export type FeaturedPlace = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  position: number;
  city: {
    name: string;
  };
};
