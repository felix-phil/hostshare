export interface Category {
  id: string;
  type: string;
  title: string;
}
export interface Avatar {
  aspectRatio: number;
  height: number;
  width: number;
  mimeType: string;
  orientation: "portrait" | "landscape" | "square";
  type: string;
  url: string;
}
export interface Listing {
  ref: string;
  info: {
    type: string;
    amenities: {
      count: number;
      data: {
        available: boolean;
        group: string;
        title: string;
        type: string;
      }[];
      type: string;
    };
    available: boolean;
    currency: { code: string; symbol: string; name: string };
    description: string;
    details: {
      count: number;
      data: { type: string; value: number }[];
      type: string;
    };
    host: {
      avatar: Avatar;
      isSuperHost: boolean;
      name: string;
    };
    id: string;
    images: {
      count: number;
      data: Avatar[];
      type: string;
    };
    location: {
      address: string;
      city: string;
      country: {
        code: string;
        title: string;
      };
      lat: number;
      lng: number;
      zip: string;
    };
    mainImage: Avatar;
    maxGuestCapacity: number;
    price: number;
    ratings: {
      accuracy: number;
      checkin: number;
      cleanliness: number;
      communication: number;
      guestSatisfactionOverall: number;
      location: number;
      value: number;
    };
    title: string;
    visibleReviewCount: number;
  };
  id: string;
}
