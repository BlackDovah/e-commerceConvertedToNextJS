"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ProductCardProps, CartItem, ProductContextType } from "@/types/types";

const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  setCartItems: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardProps | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = window.localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const productState = useMemo(
    () => ({
      selectedProduct,
      setSelectedProduct,
      cartItems,
      setCartItems,
      isCartOpen,
      setIsCartOpen,
    }),
    [selectedProduct, cartItems, isCartOpen]
  );

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
