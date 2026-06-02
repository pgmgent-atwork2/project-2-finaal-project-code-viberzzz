import { API } from "../././../lib/supabaseClient";
import { FiltratieWaarden } from "../../types/types.filtratie_waarden";

export const getFiltratieWaarden = async (): Promise<
  FiltratieWaarden[] | null
> => {
  const { data, error } = await API.from("filtratie_waarden").select("*");
  if (error) {
    console.error("Error fetching filtratie waarden:", error);
    return null;
  }
  return data;
};

export const getFiltratieWaardenByUnitId = async (
  unitId: string,
): Promise<FiltratieWaarden[] | null> => {
  const { data, error } = await API.from("filtratie_waarden")
    .select("*")
    .eq("unit_id", unitId);
  if (error) {
    console.error("Error fetching filtratie waarden by unit ID:", error);
    return null;
  }
  return data;
};

export const addFiltratieWaarde = async (
  waarde: Partial<FiltratieWaarden>,
): Promise<FiltratieWaarden | null> => {
  const { data, error } = await API.from("filtratie_waarden")
    .insert([waarde])
    .select()
    .single();
  
  if (error) {
    console.error("Error adding filtratie waarde:", error);
    return null;
  }
  return data;
};
