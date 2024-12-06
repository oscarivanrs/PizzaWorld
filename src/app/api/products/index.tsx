import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types';

type Product = Tables<'products'>;

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select();
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
          .from('products')
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
      async mutationFn(data: any) {
        const { error } = await supabase.from('products').insert({
          name: data.name,
          price: data.price,
          image: data.image,
        });
  
        if (error) {
          throw error;
        }
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
      async mutationFn(data: any) {
        const { data: updatedProduct , error } = await supabase
          .from('products')
          .update({
            name: data.name,
            image: data.image,
            price: data.price,
          })
          .eq('id', data.id)
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
          .from('products')
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