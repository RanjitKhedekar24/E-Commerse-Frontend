import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaStar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Spinner from "react-bootstrap/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = () => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/product/all-product"
      );
      const data = await response.json();
      setProds(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to cart with quantity check
  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart!`);
  };

  // Delete product
  const handleDeleteProduct = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = await fetch(
        `https://e-commerse-backend-ig4l.onrender.com/product/delete-product/${pid}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Product deleted successfully!");
        setProds(prods.filter((p) => p._id !== pid));
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting product");
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" variant="primary" className="me-2" />
        <span>Loading products...</span>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-3 text-primary fw-bold">
            Our Products
          </h2>
          <p className="text-center text-muted mb-4">
            Discover our premium collection
          </p>
        </Col>
      </Row>

      {prods.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6} className="text-center py-5">
            <div className="bg-light p-5 rounded-3">
              <h4 className="text-muted mb-3">No products available</h4>
              <Button variant="outline-primary" onClick={fetchProducts}>
                Refresh Products
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {prods.map((product) => (
            <Col key={product._id}>
              <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "200px" }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://e-commerse-backend-ig4l.onrender.com/product/product-photo/${product._id}`}
                    className="img-fluid p-3"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                    alt={product.name}
                  />
                  {product.price < 500 && (
                    <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                      SALE
                    </span>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">
                    <span className="text-dark fw-semibold">
                      {product.name}
                    </span>
                  </Card.Title>

                  <div className="d-flex align-items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-warning me-1" />
                    ))}
                    <FaStar className="text-muted me-2" />
                    <span className="small text-muted">(24)</span>
                  </div>

                  <Card.Text
                    className="text-muted small mb-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h5 className="mb-0 text-primary d-flex align-items-center">
                      <FaRupeeSign className="me-1" />
                      {product.price}
                    </h5>
                  </div>

                  {/* Action buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/dashboard/admin/UpdateProduct/${product.slug}`
                        )
                      }
                    >
                      <FaEdit className="me-1" /> Update
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-1" /> Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
