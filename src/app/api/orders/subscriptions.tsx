import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SCHEMA } from "@/constants/Database";

export const useInsertOrdersSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channels = supabase.channel('custom-insert-channel')
        .on(
        'postgres_changes',
        { event: 'INSERT', schema: SCHEMA, table: 'orders' },
        (payload) => {
            queryClient.invalidateQueries({queryKey: ['orders']});
        }
        )
        .subscribe()
        return () => {
            channels.unsubscribe();
        };
      }, []);
}

export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channels = supabase
          .channel('custom-filter-channel')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: SCHEMA,
              table: 'orders',
              filter: `id=eq.${id}`,
            },
            (payload) => {
                queryClient.invalidateQueries({queryKey: ['order', id]});
            }
          )
          .subscribe();
      
        return () => {
            channels.unsubscribe();
        };
      }, []);
}