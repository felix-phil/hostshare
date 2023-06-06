import path from "path";
import { NextResponse } from "next/server";
import fspromise from "fs/promises";
import { Listing } from "@/api/types";

export async function GET(req: Request) {
  try {
    const jsonDirectory = path.join(process.cwd(), "data");
    const file = await fspromise.readFile(
      jsonDirectory + "/listings.json",
      "utf-8"
    );
    const data = JSON.parse(file);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          error: "Param id not specified",
        },
        { status: 400 }
      );
    }
    const properties = data["data"] as Listing[];
    const property = properties.find((prop) => prop.id === id);
    if (!property) {
      return NextResponse.json(
        {
          error: "Item not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(property, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
      },
      { status: 500 }
    );
  }
}
