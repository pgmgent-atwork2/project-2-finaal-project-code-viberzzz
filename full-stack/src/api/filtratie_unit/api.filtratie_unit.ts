import { API } from "../././../lib/supabaseClient";
import { FiltratieUnit } from "../../types/types.filtratie_unit";
import { FiltratieWaarden } from "../../types/types.filtratie_waarden";

export const getFiltratieUnits = async (): Promise<{}> => {
  const [{ data: units, error: e1 }, { data: waarden, error: e2 }] =
    await Promise.all([
      API.from("filtratie_unit").select("*, waarden_range(*)"),
      API.from("filtratie_waarden").select("*"),
    ]);
  if (e1 || e2) {
    console.error("Error fetching filtratie units:", e1, e2);
    return { filtratie_unit: null, filtratie_unit_waarden: null };
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

export const getFiltratieUnitById = async (id: string): Promise<any> => {
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
    filtratie_waarden: waarden || [],
  };
};
