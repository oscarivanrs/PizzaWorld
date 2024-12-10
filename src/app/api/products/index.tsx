import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product, ProductInsert } from '@/types';
import { SCHEMA, tableProducts } from '@/constants/Database';

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.schema(SCHEMA).from(tableProducts).select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
    return useQuery<Product>({
      queryKey: ['product', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .schema(SCHEMA)
          .from(tableProducts)
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

  
export const useInsertProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: ProductInsert) {
        const { data: newProduct, error } = await supabase.schema(SCHEMA).from('products').insert({
          name: data.name,
          price: data.price,
          image: data.image,
        });
  
        if (error) {
          throw error;
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['products']});
      },
      onError(error) {
        console.log(error);
      },
    });
  };

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: ProductInsert) {
        const { data: updatedProduct , error } = await supabase
          .schema(SCHEMA)
          .from(tableProducts)
          .update({
            name: data.name,
            image: data.image,
            price: data.price,
          })
          .eq('id', data.id!)
          .select();
  
        if (error) {
          throw error;
        }
        return updatedProduct ;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({queryKey: ['products']});
        await queryClient.invalidateQueries({queryKey: ['product', id]});
      },
      onError(error) {
        console.log(error);
      },
    });
  };

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(id: number) {
        const { data, error } = await supabase
          .schema(SCHEMA)
          .from(tableProducts)
          .delete()
          .eq('id', id)
          .select();
  
        if (error) {
          throw error;
        }
        return data;
      },
      async onSuccess(_, id) {
        await queryClient.invalidateQueries({queryKey: ['products']});
        await queryClient.invalidateQueries({queryKey: ['products',id]});
      },
      onError(error) {
        console.log(error);
      },
    });
  };