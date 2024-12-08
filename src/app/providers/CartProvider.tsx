import { CartItem, Order, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { randomUUID } from "expo-crypto";
import { useInsertNewOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    checkout: () => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkout: () => {}
});

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const { mutate: insertOrder } = useInsertNewOrder();
    const { mutate: insertOrderitems } = useInsertOrderItems();
    const router = useRouter();

    const addItem = (product: Product, size: CartItem['size']) => {
      const existingItem = items.find(
          (item) => item.product === product && item.size === size
        );
    
        if (existingItem) {
          updateQuantity(existingItem.id, 1);
          return;
        }

      const newCartItem: CartItem = {
          id: randomUUID(),
          product,
          product_id: product.id,
          size,
          quantity: 1
      }
      setItems([newCartItem, ...items]);
      console.log(items)
    };

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
          items
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + amount }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
    };

    const total = items.reduce(
      (sum, item) => (sum += item.product.price * item.quantity), 0
    );
  
    const clearCart = () => {
      setItems([]);
    };

    const checkout = () => {
      insertOrder(total, {onSuccess: (data) => saveOrderItems(data)});
    }

    const saveOrderItems = (data: Order) => {
      insertOrderitems({items, order_id: data.id}, {onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders/${data.id}`);
      }})
    }

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
export const useCart = () => useContext(CartContext);