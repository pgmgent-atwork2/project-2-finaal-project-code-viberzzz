import AuthContext from "./AuthContext";
import { useState, useCallback, useEffect } from "react";
import { getCurrentAuth } from "../../backend/auth/api.auth";
import { login } from "../../backend/auth/api.auth";
import { API } from "../../backend/network-supabase/api";

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);  
    const [isInitialized, setIsInitialized] = useState(false);
    
    const fetchAuth = useCallback(async () => {
        try {
            const currentAuth = await getCurrentAuth();
            setAuth(currentAuth);
        } catch {
            setAuth(null);
        }
    }, []);

    useEffect(() => {
        fetchAuth().finally(() => setIsInitialized(true));

        API.auth.onAuthStateChange((event) => {
            switch(event) {
                case "USER_UPDATED":
                case "TOKEN_REFRESHED":
                    fetchAuth();
                    break;
                case "SIGNED_OUT":
                    setAuth(null);
                    break;
            }
        });
    }, [fetchAuth]);
    
    const handleLogin = async (data) => {
        const newAuth = await login(data);
        setAuth(newAuth);
        return newAuth;
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                refresh: fetchAuth,
                isInitialized,
                isLoggedIn: !!auth,
                login: handleLogin
            }}>
            {isInitialized ? children : null}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
