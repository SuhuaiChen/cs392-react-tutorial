import { useAuthState, useData } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [isAdmin] =  useData(`/admins/${user?.uid || 'guest'}`);
  return [user, isAdmin ];
};