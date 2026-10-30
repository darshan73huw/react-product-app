import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

function Products() {
  const { products, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function downloadProducts() {
    const jsonData = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "product.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page">
      <div className="products-header">
        <div>
          <h1>Our Products</h1>
          <p>Browse all the products you have submitted.</p>
        </div>

        {products.length > 0 && (
          <button
            type="button"
            className="submit-btn"
            onClick={downloadProducts}
          >
            Export product.json
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No products yet</h3>
          <p>Go to Home and add your first product.</p>
        </div>
      ) : (
        <>
          <label className="search-label" htmlFor="product-search">
            Search products by name
          </label>
          <input
            id="product-search"
            className="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {editingProduct && (
            <div className="edit-product">
              <ProductForm
                key={editingProduct.id}
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No matching products</h3>
              <p>Try a different product name.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={setEditingProduct}
                  onDelete={deleteProduct}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
