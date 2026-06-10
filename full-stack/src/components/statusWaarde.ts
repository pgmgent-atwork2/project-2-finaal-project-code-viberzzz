import { WaardenRange } from "../types/types.waarden_range";
import { FiltratieWaarden } from "../types/types.filtratie_waarden";

export type ParameterStatus = 'in_range' | 'out_of_range' | 'missing';

export interface WaardeStatus {
    ph: ParameterStatus;
    temperatuur: ParameterStatus;
    water_level: ParameterStatus;
    zoutgehalte: ParameterStatus;
    microbiologie: ParameterStatus;
}

export function getParameterStatus(value: number | null | undefined, min?: number, max?: number): ParameterStatus {
    if (value === null || value === undefined || isNaN(value)) {
        return 'missing';
    }
    
    if (min !== undefined && max !== undefined) {
        return (value >= min && value <= max) ? 'in_range' : 'out_of_range';
    }
    
    if (max !== undefined) {
        return value <= max ? 'in_range' : 'out_of_range';
    }
    
    return 'in_range';
}

export function getWaardeStatus(waarde: FiltratieWaarden | null | undefined, range: WaardenRange | null | undefined): WaardeStatus {
    if (!waarde || !range) {
        return {
            ph: 'missing',
            temperatuur: 'missing',
            water_level: 'missing',
            zoutgehalte: 'missing',
            microbiologie: 'missing',
        };
    }

    return {
        ph: getParameterStatus(waarde.ph, range.ph_min, range.ph_max),
        temperatuur: getParameterStatus(waarde.temperatuur, range.temperatuur_min, range.temperatuur_max),
        water_level: getParameterStatus(waarde.water_level, range.water_level_min, range.water_level_max),
        zoutgehalte: getParameterStatus(waarde.zoutgehalte, range.zoutgehalte_min, range.zoutgehalte_max),
        microbiologie: getParameterStatus(waarde.microbiologie, undefined, range.microbiologie_max),
    };
}

export function hasAnyOutOfRange(waardeStatus: WaardeStatus): boolean {
    return Object.values(waardeStatus).some(status => status === 'out_of_range');
}

export function hasAllMissing(waardeStatus: WaardeStatus): boolean {
    return Object.values(waardeStatus).every(status => status === 'missing');
}

export function getParameterRowStyle(status: ParameterStatus) {
    const baseStyle = {
        padding: "8px 12px",
        borderRadius: "6px",
        marginBottom: "8px",
    };

    if (status === 'missing') {
        return baseStyle;
    }

    if (status === 'out_of_range') {
        return {
            ...baseStyle,
            background: "#fef3c7",
            color: "#d97706",
        };
    }

    return {
        ...baseStyle,
        background: "#dcfce7",
        color: "#16a34a",
    };
}
