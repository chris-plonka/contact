import { supabase } from "../lib/supabase";


supabase
  .channel("contacts")
  .on("postgres_changes", ...)