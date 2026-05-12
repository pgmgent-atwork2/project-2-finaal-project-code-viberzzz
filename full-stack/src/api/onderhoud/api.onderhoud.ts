import { API } from "../supabaseClient";
import { Onderhoud } from "../../types/types.onderhoud";

export const getOnderhoudItems = async (): Promise<Onderhoud[] | null> => {
  const { data, error } = await API.from("onderhoud").select("*");
  if (error) {
    console.error("Error fetching onderhoud items:", error);
    return null;
  }
  return data;
};

export const getOnderhoudByUnitId = async (unitId: string): Promise<Onderhoud[] | null> => {
  const { data, error } = await API.from("onderhoud").select("*").eq("unit_id", unitId);
  if (error) {
    console.error("Error fetching onderhoud by unit ID:", error);
    return null;
  }
  return data;
};
