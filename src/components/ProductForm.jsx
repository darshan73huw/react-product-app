import { useState } from "react";
import { useProducts } from "../context/ProductContext";

const emptyForm = {
  name: "",
  link: "",
  description: "",
  price: "",
  image: "",
};

function ProductForm({ product, onCancel }) {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState(() =>
    product ? { ...product, price: String(product.price) } : emptyForm
  );
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(formData.price);

    if (!Number.isFinite(price) || price < 0) {
      setMessage("Enter a valid, non-negative price.");
      return;
    }

    const productDetails = { ...formData, price };

    if (product) {
      updateProduct(product.id, productDetails);
      onCancel();
      return;
    }

    addProduct(productDetails);
    setFormData(emptyForm);
    setMessage("Product added successfully!");
  }

  const isEditing = Boolean(product);

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit Product" : "Add a Product"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="link">Product Link</label>
        <input
          id="link"
          name="link"
          type="url"
          placeholder="https://example.com/product"
          value={formData.link}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your product"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price (₹)</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Product Image URL</label>
        <input
          id="image"
          type="url"
          name="image"
          placeholder="Enter product image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? "Save Changes" : "Submit Product"}
          </button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default ProductForm;
