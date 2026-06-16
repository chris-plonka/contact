// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



// hooks/useContacts.ts
import { supabase } from "../lib/supabase";

export async function getContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*");

  if (error) throw error;

  return data;
}