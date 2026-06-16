const { data } = await supabase
  .from("contacts")
  .select("*");