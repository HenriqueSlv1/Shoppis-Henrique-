import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, ProductDTO } from "../types/Products";
import { showError } from "../components/Toast";

type CartContextProps = {
  cart: ICartItem[];
  getCart: () => void;
  addProduct: (product: ProductDTO) => void;
  removeProduct: (id: number) => void;
  checkout: () => void; // Adicionando a função de checkout
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const storeCart = async (value: ICartItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (error) {
      showError("Não foi possível salvar o carrinho");
    }
  };

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      const cartData = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setCart(cartData);
    } catch (error) {
      showError("Não foi possível recuperar o carrinho");
    }
  };

  const addProduct = (value: ProductDTO) => {
    const existingProduct = cart.find(({ product }) => value.id === product.id);

    if (existingProduct) {
      const newcart = cart.map((item) =>
        item.product.id === existingProduct.product.id
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 }
          : item
      );

      setCart(newcart);
      storeCart(newcart);
    } else {
      const newCart = [...cart];
      const data: ICartItem = { product: value, quantity: 1 };
      newCart.push(data);
      setCart(newCart);
      storeCart(newCart);
    }
  };

  const removeProduct = (productIdToRemove: number) => {
    const index = cart.findIndex(c => c.product.id === productIdToRemove);

    if (cart[index].quantity === 1) {
      const updatedCart = cart.filter(({ product }) => product.id !== productIdToRemove);
      setCart(updatedCart);
      storeCart(updatedCart);
    } else {
      const newCart = [...cart]
      newCart[index].quantity = newCart[index].quantity - 1;

      setCart(newCart);
      storeCart(newCart);
    }
  };

  const checkout = () => {
    // Aqui você implementa a lógica de checkout
    // Por exemplo, processar o pagamento, limpar o carrinho, etc.
    // Você pode chamar essa função de onde precisar no seu aplicativo
  };

  return (
    <CartContext.Provider value={{ cart, getCart, addProduct, removeProduct, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
