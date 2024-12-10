import { supabase } from "@/lib/supabase";
import { CartItem, OrderItem } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SCHEMA, tableOrderItems } from "@/constants/Database";

export const useInsertOrderItems = () => {
    return useMutation({
      async mutationFn({
        items,
        order_id,
      }: {
        items: CartItem[];
        order_id: number;
      }) {
        const { error } = await supabase.schema(SCHEMA).from(tableOrderItems).insert(
          items.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            order_id: order_id,
            product_id: item.product_id,
          }))
        );
  
        if (error) {
          throw error;
        }
      },
      onError(error) {
        console.log(error);
      },
    });
  };

export const useOrderItems = (order_id: number) => {
  
    return useQuery<OrderItem[]>({
      queryKey: ['order_items', order_id],
      queryFn: async () => {  
        const { data, error } = await supabase
          .schema(SCHEMA)
          .from(tableOrderItems)
          .select()
          .eq('order_id', order_id);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };