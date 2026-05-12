import { Database } from "./database.types";

export type Gebruiker = Database["public"]["Tables"]["gebruiker"]["Row"];
export type GebruikerInsert = Database["public"]["Tables"]["gebruiker"]["Insert"];
export type GebruikerUpdate = Database["public"]["Tables"]["gebruiker"]["Update"];
