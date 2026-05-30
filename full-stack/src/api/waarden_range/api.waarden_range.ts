import { API } from "../././../lib/supabaseClient";
import { WaardenRange } from "../../types/types.waarden_range";

export const getWaardenRanges = async (): Promise<WaardenRange[] | null> => {
  const { data, error } = await API.from("waarden_range").select("*");
  if (error) {
    console.error("Error fetching waarden ranges:", error);
    return null;
  }
  return data;
};

export const getWaardenRangeByUnitId = async (
  unitId: string,
): Promise<WaardenRange | null> => {
  const { data, error } = await API.from("waarden_range")
    .select("*")
    .eq("unit_id", unitId)
    .single();
  if (error) {
    console.error("Error fetching waarden range by unit ID:", error);
    return null;
  }
  return data;
};
