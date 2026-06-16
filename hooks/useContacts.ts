const { data, error } = await supabase
  .from("contacts")
  .select("*");

if (error) {
  console.error(error);
} else {
  console.log(data);
}