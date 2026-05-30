import { supabase } from "@/lib/supabase";

async function testConnection() {
  const { data, error } = await supabase.from("gebruiker").select("*").limit(1);

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

testConnection();
