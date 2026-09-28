import * as React from "react";
import { getToken, setToken } from "../api/client";
import { getProfile } from "../api/profile";
import type { Lang, User } from "../api/types";

interface Ctx {
  user: User | null;
  /** true only while the initial "do we have a valid session" check on
   * mount is in flight — lets ProtectedRoute avoid a flash-redirect to
   * /login before we've even checked localStorage. */
  initializing: boolean;
  loginWithToken: (token: string, user: User) => void;
  logout: () => void;
  refreshProfile: (lang: Lang) => Promise<void>;
}

const AuthContext = React.createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const token = getToken();
    if (!token) {
      setInitializing(false);
      return;
    }
    getProfile("en")
      .then((res) => setUser((prev) => ({ ...(prev as User), ...res.data })))
      .catch(() => setToken(null))
      .finally(() => setInitializing(false));
  }, []);

  const loginWithToken = React.useCallback((token: string, u: User) => {
    setToken(token);
    setUser(u);
  }, []);

  const logout = React.useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const refreshProfile = React.useCallback(async (lang: Lang) => {
    const res = await getProfile(lang);
    setUser((prev) => ({ ...(prev as User), ...res.data }));
  }, []);

  const value = React.useMemo(
    () => ({ user, initializing, loginWithToken, logout, refreshProfile }),
    [user, initializing, loginWithToken, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
