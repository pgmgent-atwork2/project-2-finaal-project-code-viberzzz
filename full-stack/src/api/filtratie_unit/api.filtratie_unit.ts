import { API } from "../supabaseClient";
import { FiltratieUnit } from "../../types/types.filtratie_unit";

export const getFiltratieUnits = async (): Promise<FiltratieUnit[] | null> => {
  const { data, error } = await API.from("filtratie_unit").select("*");
  if (error) {
    console.error("Error fetching filtratie units:", error);
    return null;
  }
  return data;
};

export const getFiltratieUnitById = async (id: string): Promise<FiltratieUnit | null> => {
  const { data, error } = await API.from("filtratie_unit").select("*").eq("id", id).single();
  if (error) {
    console.error("Error fetching filtratie unit:", error);
    return null;
  }
  return data;
};
