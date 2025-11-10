import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dirPath = path.join(process.cwd(), "messages");
  const files = fs.readdirSync(dirPath);

  const languages = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", "")); // "fr.json" → "fr"

  return NextResponse.json(languages);
}
