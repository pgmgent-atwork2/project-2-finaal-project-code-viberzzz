import { API } from "../supabaseClient";


export const getFiltratieUnits = async () => {

    const { data: user_data } = await API.from("filtratie_unit").select("*");
    return user_data;

}
