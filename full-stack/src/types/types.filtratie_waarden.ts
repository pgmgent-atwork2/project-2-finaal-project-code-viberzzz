import { Database } from "./database.types";

export type FiltratieWaarden = Database["public"]["Tables"]["filtratie_waarden"]["Row"];
export type FiltratieWaardenInsert = Database["public"]["Tables"]["filtratie_waarden"]["Insert"];
export type FiltratieWaardenUpdate = Database["public"]["Tables"]["filtratie_waarden"]["Update"];
