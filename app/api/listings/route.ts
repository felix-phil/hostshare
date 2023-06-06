import { NextResponse } from "next/server";
import fspromise from "fs/promises";

export async function GET(req: Request) {
  try {
    const file = await fspromise.readFile("data/listings.json");
    const data = JSON.parse(file.toString("utf-8"));
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const properties = data["data"];
    const filtered = properties.filter((property: any) => {
      if (
        location &&
        property.info.location.city
          ?.toLowerCase()
          ?.startsWith(location?.toLowerCase())
      ) {
        return true;
      }
      if (
        location &&
        property.info.location.country?.title
          .toLowerCase()
          ?.startsWith(location?.toLowerCase())
      ) {
        return true;
      }
    });

    return NextResponse.json(
      location ? filtered : properties,

      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
      },
      { status: 400 }
    );
  }
}
