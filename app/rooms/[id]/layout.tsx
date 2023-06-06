import { Metadata, ResolvingMetadata } from "next";
import axios from "axios";
import apiEndpoints from "@/api/api-endpoints";
import { Listing } from "@/api/types";

type Props = {
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params }: Props,
  // parent?: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const listing = (
    await axios.get(process.env.SITE_URL + apiEndpoints.SINGLE_LISTING(id))
  ).data as Listing;
  return {
    title: listing.info.title,
    description: listing.info.description,
    openGraph: {
      type: "website",
      images: [listing.info.mainImage.url],
    },
  };
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { id: string };
}) {
  return (
    <div className="flex-1 flex flex-col items-center overflow-y-auto w-full">
      {children}
    </div>
  );
}
