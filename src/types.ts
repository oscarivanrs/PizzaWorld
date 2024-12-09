import { Database } from './database.types';

export type Tables<T extends keyof Database['pizzaWorld']['Tables']> =
  Database['pizzaWorld']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['pizzaWorld']['Tables']> =
  Database['pizzaWorld']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['pizzaWorld']['Tables']> =
  Database['pizzaWorld']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['pizzaWorld']['Enums']> =
  Database['pizzaWorld']['Enums'][T];

export type Product = Tables<'products'>;
export type ProductInsert = TablesInsert<'products'>;
export type ProductUpdate = TablesUpdate<'products'>;
/*export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};*/

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = Tables<'orders'>;
export type OrderInsert = TablesInsert<'orders'>;
export type OrderUpdate = TablesUpdate<'orders'>;
/*export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};*/

export type OrderItem = Tables<'order_items'>;
/*export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};*/

//export type Profile = Tables<'profiles'>;
export type Profile = {
  id: string;
  group: string;
};
