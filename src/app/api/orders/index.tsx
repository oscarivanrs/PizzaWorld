import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Order, OrderInsert, OrderItem, OrderStatus, OrderUpdate } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SCHEMA } from "@/constants/Database";

export const useAllOrdersList = ({ archived = false }) => {

  const statusList: OrderStatus[] = (archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']);

  return useQuery<Order[]>({
    queryKey: ['orders',{archived}],
    queryFn: async () => {
      const { data, error } = await supabase.schema(SCHEMA).from('orders').select().in('status', statusList).order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrders = () => {
    const { profile } = useAuth();
  
    return useQuery<Order[]>({
      queryKey: ['orders', { userId: profile?.id }],
      queryFn: async () => {
        if (!profile) return [];
  
        const { data, error } = await supabase
          .schema(SCHEMA)
          .from('orders')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };

export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ['order', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .schema(SCHEMA)
          .from('orders')
          .select('*, order_items(*, products(*))')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };

export const useInsertNewOrder = () => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    async mutationFn(total: number) {
      const { data: newOrder, error } = await supabase.schema(SCHEMA).from('orders').insert({total, user_id: profile?.id!}).select().single();
      if (error) {
        throw error;
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['orders']});
      await queryClient.invalidateQueries({queryKey: ['orders', { userId: profile?.id }]});
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn({ order_id, status } : { order_id: number, status: string }) {
        const { data: updatedOrder , error } = await supabase
          .schema(SCHEMA)
          .from('orders')
          .update({
            status: status
          })
          .eq('id', order_id)
          .select();
  
        if (error) {
          throw error;
        }
        return updatedOrder ;
      },
      async onSuccess(_, { order_id }) {
        await queryClient.invalidateQueries({queryKey: ['orders']});
        await queryClient.invalidateQueries({queryKey: ['order', order_id]});
      },
      onError(error) {
        console.log(error);
      },
    });
  };