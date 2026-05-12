import { createContext } from "react";

const AuthContext = createContext({
    isInitialized: false,
    isLoggedIn: false,
    auth: null,
    refresh: async () => Promise.resolve(),
    login: async (data) => Promise.resolve(null),
});

export default AuthContext;
