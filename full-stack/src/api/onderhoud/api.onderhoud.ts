import { API } from "../././../lib/supabaseClient";
import { Onderhoud } from "../../types/types.onderhoud";

export const getOnderhoudItems = async (): Promise<Onderhoud[] | null> => {
  const { data, error } = await API
    .from("onderhoud")
    .select(`
      *,
      gebruiker:toegewezen_aan (
        id,
        naam,
        email,
        rol
      ),
      unit:unit_id (
        id,
        naam,
        locatie,
        status
      )
    `);

  if (error) {
    console.error("Error fetching onderhoud items:", error);
    return null;
  }

  return data;
};

export const getOnderhoudByUnitId = async (
  unitId: string,
): Promise<Onderhoud[] | null> => {
  const { data, error } = await API.from("onderhoud")
    .select("*")
    .eq("unit_id", unitId);
  if (error) {
    console.error("Error fetching onderhoud by unit ID:", error);
    return null;
  }
  return data;
};

export const updateOnderhoudStatus = async (
  id: string,
  status: "gepland" | "voltooid" | "overgeslagen",
): Promise<Onderhoud | null> => {
  const { data, error } = await API.from("onderhoud")
    .update({ status, bijgewerkt_op: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating onderhoud status:", error);
    return null;
  }

  return data?.[0] || null;
};
