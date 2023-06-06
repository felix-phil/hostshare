import { NextResponse } from "next/server";
import fspromise from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  try {
    const jsonDirectory = path.join(process.cwd(), "data");
    const file = await fspromise.readFile(
      jsonDirectory + "/listings.json",
      "utf-8"
    );
    const data = JSON.parse(file);
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
