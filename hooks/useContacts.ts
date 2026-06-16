

// hooks/useContacts.ts
// 
import { supabase } from "../lib/supabase";

export async function getContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*");

  if (error) throw error;

  return data;
}