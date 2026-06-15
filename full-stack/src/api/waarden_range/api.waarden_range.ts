import { API } from "../././../lib/supabaseClient";
import { WaardenRange, WaardenRangeInsert, WaardenRangeUpdate } from "../../types/types.waarden_range";

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

export const createWaardenRange = async (
  rangeData: WaardenRangeInsert
): Promise<WaardenRange | null> => {
  const { data, error } = await API.from("waarden_range")
    .insert(rangeData)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating waarden range:", error);
    return null;
  }
  return data;
};

export const updateWaardenRange = async (
  unitId: string,
  updates: WaardenRangeUpdate
): Promise<WaardenRange | null> => {
  const { data, error } = await API.from("waarden_range")
    .update(updates)
    .eq("unit_id", unitId)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating waarden range:", error);
    return null;
  }
  return data;
};
