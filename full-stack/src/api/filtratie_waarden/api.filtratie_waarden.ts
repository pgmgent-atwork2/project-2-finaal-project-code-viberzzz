import { API } from "../././../lib/supabaseClient";
import { FiltratieWaarden } from "../../types/types.filtratie_waarden";


export const getFiltratieWaarden = async (): Promise<
  FiltratieWaarden[] | null
> => {
  const { data, error } = await API.from("filtratie_waarden").select("*");
  if (error) {
    console.error("Error fetching filtratie waarden:", error);
    return null;
  }
  return data;
};

export const getFiltratieWaardenByUnitId = async (
  unitId: string,
): Promise<FiltratieWaarden[] | null> => {
  const { data, error } = await API.from("filtratie_waarden")
    .select("*")
    .eq("unit_id", unitId)
    .order("gemeten_op", { ascending: false });
  if (error) {
    console.error("Error fetching filtratie waarden by unit ID:", error);
    return null;
  }
  return data;
};

export const addFiltratieWaarde = async (
  waarde: Partial<FiltratieWaarden>,
): Promise<FiltratieWaarden | null> => {
  const { data, error } = await API.from("filtratie_waarden")
    .insert([waarde])
    .select()
    .single();
  
  if (error) {
    console.error("Error adding filtratie waarde:", error);
    return null;
  }
  return data;
};
// export const getRapporten = async (): Promise<Rapport[] | null> => {
//   const rapporten = await Promise.all([
//     API.from("filtratie_unit")
//       .select("*, waarden_range(*), filtratie_waarden(*), onderhoud(*, gebruiker:toegewezen_aan(naam))")
//   ]);
    
//   rapporten.forEach((r) => {
//     if (r.error) {
//       console.error("Error fetching rapporten:", r.error);
//     }
//   });
    
//   const formattedRapporten = rapporten
//     .filter((r) => r.data && r.data.length > 0)
//     .flatMap((r) => {
//       return r.data!.map((unit) => {
//         console.log('Unit data:', {
//           id: unit.id,
//           naam: unit.naam,
//           filtratie_waarden_count: unit.filtratie_waarden?.length || 0,
//           filtratie_waarden: unit.filtratie_waarden,
//           onderhoud_count: unit.onderhoud?.length || 0
//         });

//         // Get the latest filtratie_waarden
//         const latestWaarden = unit.filtratie_waarden && unit.filtratie_waarden.length > 0
//           ? unit.filtratie_waarden.sort((a: FiltratieWaarden, b: FiltratieWaarden) =>
//             new Date(b.gemeten_op).getTime() - new Date(a.gemeten_op).getTime()
//           )[0]
//           : null;

//         console.log('Latest waarden for', unit.naam, ':', latestWaarden);

//         // Get the latest onderhoud
//         const latestOnderhoud = unit.onderhoud && unit.onderhoud.length > 0
//           ? unit.onderhoud.sort((a: Onderhoud, b: Onderhoud) =>
//             new Date(b.start_datum || b.bijgewerkt_op).getTime() -
//             new Date(a.start_datum || a.bijgewerkt_op).getTime()
//           )[0]
//           : null;

//         // Calculate status based on latest water values
//         let calculatedStatus: UnitStatus = UNIT_STATUS.STORING;
//         if (latestWaarden && unit.waarden_range) {
//           // Check if any value is missing (-1 means no data)
//           const hasAllData = latestWaarden.ph !== null &&
//             latestWaarden.temperatuur !== null &&
//             latestWaarden.water_level !== null &&
//             latestWaarden.zoutgehalte !== null &&
//             latestWaarden.microbiologie !== null;
            
//           if (hasAllData) {
//             calculatedStatus = getStatus(
//               latestWaarden.ph,
//               latestWaarden.temperatuur,
//               latestWaarden.water_level,
//               latestWaarden.zoutgehalte,
//               latestWaarden.microbiologie,
//               unit.waarden_range
//             );
//           }
//         }

//         const rapport: Rapport = {
//           id: unit.id,
//           titel: unit.naam,
//           ph: latestWaarden?.ph ?? -1,
//           temperatuur: latestWaarden?.temperatuur ?? -1,
//           waterniveau: latestWaarden?.water_level ?? -1,
//           microbiologie: latestWaarden?.microbiologie ?? -1,
//           zoutgehalte: latestWaarden?.zoutgehalte ?? -1,
//           notities: latestOnderhoud?.notitie || '',
//           technicus: latestOnderhoud?.gebruiker || { naam: 'Onbekend' } as Gebruiker,
//           waarden_range: unit.waarden_range,
//           gemaakt_op: latestWaarden?.gemeten_op || new Date().toISOString(),
//           status: calculatedStatus,
//         };
          
//         return rapport;
//       });
//     });

//   console.log('All Rapporten:', formattedRapporten);
//   return formattedRapporten;
// };