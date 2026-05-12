import { Database } from "./database.types";

export type Onderhoud = Database["public"]["Tables"]["onderhoud"]["Row"];
export type OnderhoudInsert = Database["public"]["Tables"]["onderhoud"]["Insert"];
export type OnderhoudUpdate = Database["public"]["Tables"]["onderhoud"]["Update"];
