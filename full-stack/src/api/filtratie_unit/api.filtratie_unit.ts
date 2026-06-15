import { API } from "../././../lib/supabaseClient";
import { FiltratieUnit } from "../../types/types.filtratie_unit";
import { FiltratieWaarden } from "../../types/types.filtratie_waarden";
import { WaardenRange, WaardenRangeInsert, WaardenRangeUpdate } from "../../types/types.waarden_range";
import { createWaardenRange, updateWaardenRange } from "../waarden_range/api.waarden_range.ts";

export interface FiltratieUnitWithLatestWaarde extends FiltratieUnit {
  latestWaarde: FiltratieWaarden | null;
}
export interface FiltratieUnitMetWaardenRange extends FiltratieUnit {
  waardenRange: WaardenRange | null;
}

export interface CreateFiltratieUnitInput {
  naam: string;
  locatie: string;
  status?: string;
  waardenRange?: Omit<WaardenRangeInsert, "unit_id">;
}

export const getFiltratieUnits = async (): Promise<FiltratieUnitWithLatestWaarde[]> => {
  const [{ data: units, error: e1 }, { data: waarden, error: e2 }] =
    await Promise.all([
      API.from("filtratie_unit").select("*, waarden_range(*)"),
      API.from("filtratie_waarden").select("*"),
    ]);
  if (e1 || e2) {
    console.error("Error fetching filtratie units:", e1, e2);
    return [];
  }
  const data = units.map((unit) => {
    const latest =
      waarden
        .filter((w) => w.unit_id === unit.id)
        .sort(
          (a, b) =>
            new Date(b.gemeten_op).getTime() - new Date(a.gemeten_op).getTime(),
        )[0] ?? null;

    return { ...unit, latestWaarde: latest };
  });
  console.log("Combined data:", data);
  return data;
};

export const getFiltratieUnitById = async (id: string): Promise<FiltratieUnitWithLatestWaarde | null> => {
  const [{ data: unit, error: e1 }, { data: waarden, error: e2 }] =
    await Promise.all([
      API.from("filtratie_unit")
        .select("*, waarden_range(*)")
        .eq("id", id)
        .single(),
      API.from("filtratie_waarden")
        .select("*")
        .eq("unit_id", id)
        .order("gemeten_op", { ascending: false }),
    ]);

  if (e1 || e2) {
    console.error("Error fetching filtratie unit:", e1, e2);
    return null;
  }

  return {
    ...unit,
    latestWaarde: waarden[0] || null,
  };
};
export const filtratieUnitUpdate = async (id: string, updates: Partial<FiltratieUnitMetWaardenRange>): Promise<FiltratieUnitMetWaardenRange | null> => { 
  // Separate waarden_range data from filtratie_unit data
  const { waardenRange, ...unitUpdates } = updates;
  
  // Update filtratie_unit
  const { data: unitData, error: unitError } = await API.from("filtratie_unit")
    .update(unitUpdates)
    .eq("id", id)
    .select()
    .single();

  if (unitError) {
    console.error("Error updating filtratie unit:", unitError);
    return null;
  }

  // Update waarden_range if provided
  let rangeData = null;
  if (waardenRange) {
    rangeData = await updateWaardenRange(id, waardenRange as WaardenRangeUpdate);
    if (!rangeData) {
      console.error("Failed to update waarden range");
    }
  } else {
    // Fetch existing waarden_range
    const { data: existingRange } = await API.from("waarden_range")
      .select("*")
      .eq("unit_id", id)
      .single();
    rangeData = existingRange;
  }

  return {
    ...unitData,
    waardenRange: rangeData
  };
}
export const createFiltratieUnit = async (unitData: CreateFiltratieUnitInput): Promise<FiltratieUnitMetWaardenRange | null> => {
  // Separate waarden_range data from filtratie_unit data
  const { waardenRange, ...unitFields } = unitData;

  // Create filtratie_unit first
  const { data: newUnit, error: unitError } = await API.from("filtratie_unit")
    .insert(unitFields)
    .select()
    .single();

  if (unitError) {
    console.error("Error creating filtratie unit:", unitError);
    return null;
  }

  // Create waarden_range if provided
  let rangeData = null;
  if (waardenRange) {
    rangeData = await createWaardenRange({
      ...waardenRange,
      unit_id: newUnit.id
    } as WaardenRangeInsert);
    
    if (!rangeData) {
      console.error("Failed to create waarden range for new unit");
    }
  }

  return {
    ...newUnit,
    waardenRange: rangeData
  };
}