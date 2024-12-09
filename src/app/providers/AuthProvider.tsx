import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false
});

export default function AuthProvider({children}: PropsWithChildren) {

    const [session,setSession] = useState<Session | null>(null);
    const [profile,setProfile] = useState<Profile | null>(null);
    const [loading,setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: {session}, error } = await supabase.auth.getSession();
            setSession(session);
            if (session) {
                // fetch profile
                const { data } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                setProfile(data || null);
                setIsAdmin(data?.group === 'ADMIN');
              }
              setLoading(false);
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });
        console.log('Auth provider is mounted')
    }, [])

    return (
        <AuthContext.Provider value={{session, profile, loading, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);