import { supabase } from "@/lib/supabase";

export const useProfile = () => {
  
    const saveExpoPushToken = async (expo_push_token: string | null) => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from("profiles")
          .update({ expo_push_token_pizzaworld: expo_push_token })
          .eq("id", session.user.id);
      }
    };

    return {saveExpoPushToken};
  };

export async function getProfileExpoToken (profile_id: string) {
    if (!profile_id) return;
    const { data, error } = await supabase
        .from("profiles")
        .select("expo_push_token_pizzaworld")
        .eq("id", profile_id)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data.expo_push_token_pizzaworld;
  };

export async function getAdminsExpoToken () {
    const { data, error } = await supabase
        .from("profiles")
        .select("expo_push_token_pizzaworld")
        .neq('expo_push_token_pizzaworld', null)
        .eq("group", 'ADMIN');
    if (error) {
        throw new Error(error.message);
    }
    return data.map(item => item.expo_push_token_pizzaworld);
};