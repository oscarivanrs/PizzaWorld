import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  dologout: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
  dologout: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Funzione per ottenere la sessione iniziale
    const fetchSession = async () => {
      const { data: { session: newsession }, error } = await supabase.auth.getSession();
      setSession(newsession);
      if (session) {
        await fetchProfile(newsession?.user?.id!);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    };
    fetchSession();
    // Ascolta i cambiamenti della sessione
    supabase.auth.onAuthStateChange((_event, newsession) => {
        setSession(newsession);
          if (newsession) {
            fetchProfile(newsession.user.id);
          } else {
            setProfile(null);
            setIsAdmin(false);
          }
      });
  }, []); // Empty dependency array, esegue una sola volta al montaggio

  // Funzione per ottenere il profilo dell'utente
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (data) {
      setProfile({
        id: data.id,
        full_name: data.full_name,
        group: data.group,
        expo_push_token: data.expo_push_token_pizzaworld,
      });
      setIsAdmin(data.group === "ADMIN");
    }

    return data;
  };

  // Funzione per il logout
  const dologout = async () => {
    if (profile) {
      await supabase
        .from("profiles")
        .update({ expo_push_token_pizzaworld: null })
        .eq("id", profile.id);
    }
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, isAdmin, dologout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
