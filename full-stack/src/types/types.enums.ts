import { Database } from './database.types';

// Export enum types from database
export type GebruikerRol = Database['public']['Enums']['gebruiker_rol'];
export type OnderhoudFrequentie = Database['public']['Enums']['onderhoud_frequentie'];
export type OnderhoudStatus = Database['public']['Enums']['onderhoud_status'];
export type UnitStatus = Database['public']['Enums']['unit_status'];

// Export enum values as constants
export const GEBRUIKER_ROL = {
  TECHNIEKER: 'technieker' as GebruikerRol,
  SUPERVISOR: 'supervisor' as GebruikerRol,
  ADMIN: 'admin' as GebruikerRol,
} as const;

export const ONDERHOUD_FREQUENTIE = {
  DAGELIJKS: 'dagelijks' as OnderhoudFrequentie,
  WEKELIJKS: 'wekelijks' as OnderhoudFrequentie,
  MAANDELIJKS: 'maandelijks' as OnderhoudFrequentie,
} as const;

export const ONDERHOUD_STATUS = {
  GEPLAND: 'gepland' as OnderhoudStatus,
  VOLTOOID: 'voltooid' as OnderhoudStatus,
  OVERGESLAGEN: 'overgeslagen' as OnderhoudStatus,
} as const;

export const UNIT_STATUS = {
  ACTIEF: 'actief' as UnitStatus,
  ONDERHOUD_NODIG: 'onderhoud_nodig' as UnitStatus,
  STORING: 'storing' as UnitStatus,
} as const;
