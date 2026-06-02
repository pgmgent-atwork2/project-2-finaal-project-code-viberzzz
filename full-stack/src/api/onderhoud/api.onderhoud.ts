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

export const createOnderhoud = async (
  onderhoudData: {
    unit_id: string;
    toegewezen_aan: string;
    start_datum: string;
    frequentie: "dagelijks" | "wekelijks" | "maandelijks";
    notitie: string;
    end_date?: string;
  },
): Promise<Onderhoud | null> => {
  // Calculate default end_date based on frequency if not provided
  let endDate = onderhoudData.end_date;
  if (!endDate) {
    const startDate = new Date(onderhoudData.start_datum);
    switch (onderhoudData.frequentie) {
      case "dagelijks":
        startDate.setDate(startDate.getDate() + 30);
        break;
      case "wekelijks":
        startDate.setDate(startDate.getDate() + 90);
        break;
      case "maandelijks":
        startDate.setMonth(startDate.getMonth() + 12);
        break;
      default:
        startDate.setDate(startDate.getDate() + 1);
    }
    endDate = startDate.toISOString().split("T")[0];
  }

  const { data, error } = await API.from("onderhoud")
    .insert([
      {
        ...onderhoudData,
        end_date: endDate,
        status: "gepland",
        bijgewerkt_op: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error creating onderhoud entry:", error);
    return null;
  }

  return data?.[0] || null;
};
