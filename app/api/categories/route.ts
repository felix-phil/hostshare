import { NextResponse } from "next/server";
import fspromise from "fs/promises";

export async function GET(req: Request) {
  try {
    const file = await fspromise.readFile("data/listings.json");
    const data = JSON.parse(file.toString("utf-8"));
    return NextResponse.json(data["categories"], {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
      },
      { status: 400 }
    );
  }
}
