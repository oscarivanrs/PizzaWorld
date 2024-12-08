import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Order, OrderInsert, OrderItem, OrderStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllOrdersList = ({ archived = false }) => {

  const statusList: OrderStatus[] = (archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']);

  return useQuery<Order[]>({
    queryKey: ['orders',{archived}],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select().in('status', statusList).order('created_at', { ascending: false });
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
    return useQuery<Order>({
      queryKey: ['order', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select()
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
    async mutationFn(data: OrderInsert) {
      const { data: newOrder, error } = await supabase.from('orders').insert({...data, user_id: profile?.id!}).select().single();
      if (error) {
        throw error;
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['orders', false]});
      await queryClient.invalidateQueries({queryKey: ['orders', { userId: profile?.id }]});
    },
    onError(error) {
      console.log(error);
    },
  });
};