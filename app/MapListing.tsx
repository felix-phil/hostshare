"use-client";
import React, { FC } from "react";
import GoogleMapReact from "google-map-react";
import { Listing as ListingType } from "@/api/types";
import ListingLocation from "./ListingLocation";

const MapListing: FC<{ listings?: ListingType[] }> = ({ listings }) => {
  const defaultProps = {
    center: {
      lat:
        listings && listings[0] ? listings[0].info.location?.lat : 10.99835602,
      lng:
        listings && listings[0] ? listings[0].info.location?.lat : 77.01502627,
    },
    zoom: 3,
  };
  return (
    <div className="fixed top-0 col-span-full w-screen h-[90vh]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {listings?.map((listing) => (
          <ListingLocation
            key={listing.id}
            lat={listing?.info?.location?.lat}
            lng={listing?.info?.location?.lat}
            listing={listing}
            priceString={`${listing?.info?.currency?.symbol}${listing?.info?.price}`}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapListing;
