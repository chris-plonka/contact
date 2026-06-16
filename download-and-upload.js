import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import fs from "fs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// darmowe generowane avatary
const avatarSeeds = [
  "john", "anna", "peter", "kasia", "marek",
  "olga", "tom", "magda", "pawel", "ewa"
];

// pobierz obrazek jako buffer
async function downloadImage(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadAvatar(seed) {
  const url = `https://api.dicebear.com/7.x/avataaars/png?seed=${seed}`;

  const fileBuffer = await downloadImage(url);

  const fileName = `${seed}.png`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, fileBuffer, {
      contentType: "image/png",
      upsert: true
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function run() {
  for (const seed of avatarSeeds) {
    console.log("Uploading:", seed);

    const avatarUrl = await uploadAvatar(seed);

    if (!avatarUrl) continue;

    await supabase
      .from("contacts")
      .update({ avatar_url: avatarUrl })
      .eq("email", `${seed}@mail.com`);

    console.log("Updated:", seed);
  }
}

run();