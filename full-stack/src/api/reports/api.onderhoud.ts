import { API } from "../././../lib/supabaseClient";
import { Gebruiker } from "../../types/types.gebruiker";
import { Onderhoud } from "../../types/types.onderhoud";
import { WaardenRange } from "../../types/types.waarden_range";
import { UnitStatus, UNIT_STATUS } from "../../types/types.enums.ts";
import { getStatus } from "../../components/status.ts";

export interface Rapport {
  id: string;
  unit_id: string;
  titel: string;
  ph: number;
  temperatuur: number;
  waterniveau: number;
  microbiologie: number;
  zoutgehalte: number;
  notities: string;
  technicus: Gebruiker;
  waarden_range: WaardenRange;
  gemaakt_op: string;
  status: UnitStatus;
  closestOnderhoud?: Onderhoud | null;
}
export interface phTrend {
  unit_id: string;
  unit_naam: string;
  gemeten_op: string;
  ph: number;
}
export interface temperatuurTrend {
  unit_id: string;
  unit_naam: string;
  gemeten_op: string;
  temperatuur: number;
}
export interface waterniveauTrend {
  unit_id: string;
  unit_naam: string;
  gemeten_op: string;
  waterniveau: number;
}
export interface onderhoudTrend {
  unit_id: string;
  unit_naam: string;
  gemeten_op: string;
  onderhoud_status: "gepland" | "voltooid" | "overgeslagen";
}

export const getRapporten = async (): Promise<Rapport[] | null> => {
  const rapporten = await Promise.all([
    API.from("filtratie_unit").select(
      "*, waarden_range(*), filtratie_waarden(*, medewerker:medewerker_id(naam)), onderhoud(*, gebruiker:toegewezen_aan(naam))",
    ),
  ]);

  rapporten.forEach((r) => {
    if (r.error) {
      console.error("Error fetching rapporten:", r.error);
    }
  });

  const formattedRapporten = rapporten
    .filter((r) => r.data && r.data.length > 0)
    .flatMap((r) => {
      return r.data!.flatMap((unit) => {
        // Return empty array if no filtratie_waarden
        if (!unit.filtratie_waarden || unit.filtratie_waarden.length === 0) {
          return [];
        }

        // Create a rapport for each filtratie_waarden measurement
        return unit.filtratie_waarden.map((waarden: any) => {
          const closestOnderhoud =
            unit.onderhoud && unit.onderhoud.length > 0
              ? unit.onderhoud.sort((a: Onderhoud, b: Onderhoud) => {
                  const dateA = new Date(
                    a.start_datum || a.bijgewerkt_op,
                  ).getTime();
                  const dateB = new Date(
                    b.start_datum || b.bijgewerkt_op,
                  ).getTime();
                  const measureDate = new Date(waarden.gemeten_op).getTime();
                  // Find closest to measurement date
                  return (
                    Math.abs(dateA - measureDate) -
                    Math.abs(dateB - measureDate)
                  );
                })[0]
              : null;
          console.log(closestOnderhoud);
          // Calculate status based on this specific measurement
          let calculatedStatus: UnitStatus = UNIT_STATUS.STORING;
          if (unit.waarden_range) {
            const hasAllData =
              waarden.ph !== null &&
              waarden.temperatuur !== null &&
              waarden.water_level !== null &&
              waarden.zoutgehalte !== null &&
              waarden.microbiologie !== null;

            if (hasAllData) {
              calculatedStatus = getStatus(
                waarden.ph,
                waarden.temperatuur,
                waarden.water_level,
                waarden.zoutgehalte,
                waarden.microbiologie,
                unit.waarden_range,
              );
            }
          }

          const rapport: Rapport = {
            id: waarden.id, // Use measurement ID, not unit ID
            unit_id: unit.id, // Add unit ID for filtering
            titel: unit.naam,
            ph: waarden.ph ?? -1,
            temperatuur: waarden.temperatuur ?? -1,
            waterniveau: waarden.water_level ?? -1,
            microbiologie: waarden.microbiologie ?? -1,
            zoutgehalte: waarden.zoutgehalte ?? -1,
            notities: waarden.notitie || "",
            technicus:
              waarden.medewerker || ({ naam: "Onbekend" } as Gebruiker),
            waarden_range: unit.waarden_range,
            gemaakt_op: waarden.gemeten_op,
            status: calculatedStatus,
          };

          return rapport;
        });
      });
    });

  // Sort by most recent first
  formattedRapporten.sort(
    (a, b) =>
      new Date(b.gemaakt_op).getTime() - new Date(a.gemaakt_op).getTime(),
  );

  console.log("All Rapporten:", formattedRapporten);
  return formattedRapporten;
};
export const getRapportById = async (id: string): Promise<Rapport | null> => {
  return null;
};
export const getAllPhTrend = async (): Promise<phTrend[] | null> => {
  const { data, error } = await API.from("filtratie_waarden")
    .select("unit_id, gemeten_op, ph, filtratie_unit(naam)")
    .not("ph", "is", null)
    .order("gemeten_op", { ascending: true });

  if (error) {
    console.error("Error fetching pH trend:", error);
    return null;
  }

  if (!data) return [];

  return data.map((item: any) => ({
    unit_id: item.unit_id,
    unit_naam: item.filtratie_unit?.naam || "Onbekend",
    gemeten_op: item.gemeten_op,
    ph: item.ph,
  }));
};
export const getTemperatuurTrend = async (
  unitId: string,
): Promise<temperatuurTrend[] | null> => {
  let query = API.from("filtratie_waarden")
    .select("unit_id, gemeten_op, temperatuur, filtratie_unit(naam)")
    .not("temperatuur", "is", null)
    .order("gemeten_op", { ascending: true });

  if (unitId && unitId !== "all") {
    query = query.eq("unit_id", unitId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching temperature trend:", error);
    return null;
  }

  if (!data) return [];

  return data.map((item: any) => ({
    unit_id: item.unit_id,
    unit_naam: item.filtratie_unit?.naam || "Onbekend",
    gemeten_op: item.gemeten_op,
    temperatuur: item.temperatuur,
  }));
};
export const getWaterniveauTrend = async (
  unitId: string,
): Promise<waterniveauTrend[] | null> => {
  let query = API.from("filtratie_waarden")
    .select("unit_id, gemeten_op, water_level, filtratie_unit(naam)")
    .not("water_level", "is", null)
    .order("gemeten_op", { ascending: true });

  if (unitId && unitId !== "all") {
    query = query.eq("unit_id", unitId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching water level trend:", error);
    return null;
  }

  if (!data) return [];

  return data.map((item: any) => ({
    unit_id: item.unit_id,
    unit_naam: item.filtratie_unit?.naam || "Onbekend",
    gemeten_op: item.gemeten_op,
    waterniveau: item.water_level,
  }));
};
export const getOnderhoudTrend = async (
  unitId: string,
): Promise<onderhoudTrend[] | null> => {
  let query = API.from("onderhoud")
    .select("unit_id, start_datum, status, filtratie_unit(naam)")
    .order("start_datum", { ascending: true });

  if (unitId && unitId !== "all") {
    query = query.eq("unit_id", unitId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching maintenance trend:", error);
    return null;
  }

  if (!data) return [];

  return data.map((item: any) => ({
    unit_id: item.unit_id,
    unit_naam: item.filtratie_unit?.naam || "Onbekend",
    gemeten_op: item.start_datum,
    onderhoud_status: item.status,
  }));
};
