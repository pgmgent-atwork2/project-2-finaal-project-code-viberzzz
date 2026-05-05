import { Session } from "@supabase/supabase-js";
import { UserData } from "../user_data/types.user_data";

export type Auth = {
  session: Session;
  user: User;
};

export type User = {
  email: string;
} & UserData;

export type LoginBody = {
  email: string;
  password: string;
};

export type CreateUserBody = {
  email: string;
  password: string;
  name: string;
};