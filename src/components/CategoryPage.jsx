// src/components/CategoryPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoryMap = {
          sankes: "en:snacks",
          "baked-products": "en:baked-goods",
          care: "en:personal-care",
          beauty: "en:cosmetics",
        };
        const apiCategory = categoryMap[categoryName] || `en:${categoryName}`;

        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/search?categories_tags=${apiCategory}&fields=code,product_name,image_url,categories_tags,ingredients_text,nutrition_grades&sort_by=popularity&page_size=50`
        );

        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setError("No products found for this category");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load category products");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page-container">
      <h2>
        {categoryName
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
        Products
      </h2>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link
              to={`/product/${product.code}`}
              key={index}
              className="product-card"
              style={{ textDecoration: "none" }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.product_name || "Product"}
                  className="product-image"
                />
              )}
              <div className="product-info">
                <h3 className="product-name">
                  {product.product_name || "No name available"}
                </h3>
                <p className="category">
                  Category:{" "}
                  {product.categories_tags && product.categories_tags.length > 0
                    ? product.categories_tags[0]
                        .replace(/^en:/, "")
                        .replace(/-/g, " ")
                    : "No category available"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;