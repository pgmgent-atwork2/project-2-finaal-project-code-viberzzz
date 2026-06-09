import { WaardenRange } from "../types/types.waarden_range";
import { UnitStatus, UNIT_STATUS } from "../types/types.enums.ts";

export function getStatus(ph: number, temperatuur: number, waterniveau: number, zoutgehalte: number, microbiologie: number, waardenrange: WaardenRange): UnitStatus {
    try {
        if (!waardenrange) return UNIT_STATUS.STORING;

        // If any parameter is missing/null/undefined/NaN → STORING
        if ([ph, temperatuur, waterniveau, zoutgehalte, microbiologie].some(v => v === null || v === undefined || isNaN(v))) {
            return UNIT_STATUS.STORING;
        }

        const phStatus = ph < waardenrange.ph_min || ph > waardenrange.ph_max;
        const tempStatus = temperatuur < waardenrange.temperatuur_min || temperatuur > waardenrange.temperatuur_max;
        const waterniveauStatus = waterniveau < waardenrange.water_level_min || waterniveau > waardenrange.water_level_max;
        const zoutgehalteStatus = zoutgehalte < waardenrange.zoutgehalte_min || zoutgehalte > waardenrange.zoutgehalte_max;
        const microbiologieStatus = microbiologie > waardenrange.microbiologie_max;

        if (phStatus || tempStatus || waterniveauStatus || zoutgehalteStatus || microbiologieStatus) {
            return UNIT_STATUS.ONDERHOUD_NODIG;
        }

        return UNIT_STATUS.ACTIEF;
    } catch (error) {
        console.error("Fout bij het bepalen van de status:", error);
        return UNIT_STATUS.STORING;
    }
}