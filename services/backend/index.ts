// Export all API functions for frontend consumption
export { login, registerUser, getCurrentAuth } from './auth/api.auth';
export { API } from './network-supabase/api';

// Export types
export type { Auth, User, LoginBody, CreateUserBody } from './auth/types.auth';
export type { Database } from './network-supabase/database.types';
