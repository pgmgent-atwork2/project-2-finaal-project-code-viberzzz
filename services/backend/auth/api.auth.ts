import { API } from "../network-supabase/api";
import { Auth, CreateUserBody, LoginBody } from "./types.auth";

export const registerUser = async (user: CreateUserBody) => {
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
export const getCurrentAuth = async (): Promise<Auth | null> => {
  const {
    data: { session },
  } = await API.auth.getSession();

  if (!session || !session.user) {
    return null;
  }
  const { user } = session;
  const { data: user_data } = await API.from("user_data").select("*").eq("id", user.id).single();

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

export const login = async ({ email, password }: LoginBody): Promise<Auth> => {
  // 1. Inloggen bij Supabase
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

  // 2. Ook profile informatie opvragen
  const auth = await getCurrentAuth();

  if (!auth) {
    throw new Error("Failed to retrieve profile after login");
  }

  return auth;
};

export const logout = async () => {
  return API.auth.signOut();
};