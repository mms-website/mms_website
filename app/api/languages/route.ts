import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dirPath = path.join(process.cwd(), "messages");
  const files = fs.readdirSync(dirPath);

  let languages = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", "")); // "fr.json" → "fr"

  // Mettre "fr" par défaut en premier
  languages = languages.sort((a, b) => (a === "fr" ? -1 : b === "fr" ? 1 : 0));

  return NextResponse.json(languages);
}
