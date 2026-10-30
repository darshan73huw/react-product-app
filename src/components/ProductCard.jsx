function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

      <p className="product-description">
        {product.description}
      </p>

      <p className="product-price">
        ₹{product.price}
      </p>

      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        className="product-link"
      >
        View Product
      </a>

      <div className="product-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
