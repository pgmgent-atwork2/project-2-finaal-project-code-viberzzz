import { useEffect } from "react";
import { API } from "../lib/supabaseClient";

export default function SupabaseTest() {
  useEffect(() => {
    async function testConnection() {
      console.log("===== SUPABASE TEST START =====");

      console.log("URL:", import.meta.env.VITE_SUPABASE_URL);

      console.log("KEY EXISTS:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

      const { data, error } = await API.from("gebruiker").select("*").limit(1);

      console.log("DATA:", data);
      console.log("ERROR:", error);

      console.log("===== SUPABASE TEST END =====");
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Supabase Test</h1>
      <p>Open F12 → Console</p>
    </div>
  );
}
