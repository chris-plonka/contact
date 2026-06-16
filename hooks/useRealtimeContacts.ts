supabase
  .channel("contacts")
  .on("postgres_changes", ...)