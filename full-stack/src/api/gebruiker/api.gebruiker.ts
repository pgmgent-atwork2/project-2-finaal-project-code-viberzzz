import { API } from "../././../lib/supabaseClient";
import { Gebruiker } from "../../types/types.gebruiker";

export const getGebruikers = async (): Promise<Gebruiker[] | null> => {
  const { data, error } = await API.from("gebruiker").select("*");
  if (error) {
    console.error("Error fetching gebruikers:", error);
    return null;
  }
  return data;
};

export const getGebruikerById = async (
  id: string,
): Promise<Gebruiker | null> => {
  const { data, error } = await API.from("gebruiker")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching gebruiker:", error);
    return null;
  }
  return data;
};
