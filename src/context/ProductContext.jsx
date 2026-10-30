import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedProducts = window.localStorage.getItem("products");

    try {
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  function addProduct(product) {
    const newProduct = {
      id: crypto.randomUUID(),
      ...product,
    };

    setProducts((previousProducts) => [...previousProducts, newProduct]);
  }

  function deleteProduct(id) {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id)
    );
  }

  function updateProduct(id, updatedDetails) {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === id ? { ...product, ...updatedDetails } : product
      )
    );
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  return useContext(ProductContext);
}