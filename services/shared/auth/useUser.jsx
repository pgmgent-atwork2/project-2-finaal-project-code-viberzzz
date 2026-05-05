import useAuth from "./useAuth.jsx";

const useUser = () => {
  const { auth } = useAuth();
  return auth?.user || null;
};

export default useUser;
