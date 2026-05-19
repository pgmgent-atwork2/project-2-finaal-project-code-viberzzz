import { API } from "../supabaseClient";
import { FiltratieUnit } from "../../types/types.filtratie_unit";
import { FiltratieWaarden } from "../../types/types.filtratie_waarden";

export const getFiltratieUnits = async (): Promise<{}> => {
  const [
    { data: units, error: e1 },
    { data: waarden, error: e2 }
  ] = await Promise.all([
    API.from("filtratie_unit").select("*, waarden_range(*)"),
    API.from("filtratie_waarden").select("*")
  ]);
  if (e1 || e2) {
    console.error("Error fetching filtratie units:", e1, e2);
    return { filtratie_unit: null, filtratie_unit_waarden: null };
  }
  const data = units.map(unit => {
    const latest = waarden
      .filter(w => w.unit_id === unit.id)
      .sort((a, b) => new Date(b.gemeten_op).getTime() - new Date(a.gemeten_op).getTime())[0] ?? null;

    return { ...unit, latestWaarde: latest };
  });
  console.log("Combined data:", data);
  return data;
};

export const getFiltratieUnitById = async (id: string): Promise<FiltratieUnit | null> => {
  const { data, error } = await API.from("filtratie_unit").select("*, waarden_range (id, ph_min, ph_max, temperatuur_min, temperatuur_max, water_level_min, water_level_max, zoutgehalte_min, zoutgehalte_max, microbiologie_max) ").eq("id", id).single();
  if (error) {
    console.error("Error fetching filtratie unit:", error);
    return null;
  }
  return data;
};
