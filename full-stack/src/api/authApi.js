import { API } from "./supabaseClient";

export const registerUser = async (user) => {
    const { email, password, name } = user;
    const { data, error } = await API.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error) {
        throw error.message;
    }

    return data;
};

export const getCurrentAuth = async () => {
    const {
        data: { session },
    } = await API.auth.getSession();

    if (!session || !session.user) {
        return null;
    }

    const { user } = session;
    const { data: user_data } = await API.from("gebruiker").select("*").eq("id", user.id).single();

    if (!user_data) {
        throw new Error("Profile not found for current user");
    }

    return {
        user: {
            email: user.email ?? "",
            ...user_data,
        },
        session,
    };
};

export const login = async ({ email, password }) => {
    const { data, error } = await API.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    if (!data || !data.session) {
        throw new Error("User not found after login");
    }

    // On login, get profile by email
    const { user } = data.session;
    const { data: user_data } = await API.from("gebruiker").select("*").eq("email", email).single();

    return {
        user: {
            email: user.email ?? "",
            ...user_data,
        },
        session: data.session,
    };
};

export const logout = async () => {
    return API.auth.signOut();
};
