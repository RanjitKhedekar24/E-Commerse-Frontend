import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../context/auth";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const params = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  // Fetch all categories
  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/category/all-category"
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  // Fetch single product details
  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://e-commerse-backend-ig4l.onrender.com/product/single-product/${params.id}`
      );
      const data = await response.json();

      if (data.success) {
        const product = data.product;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setQuantity(product.quantity);
        setCategory(product.category._id);
        setId(product._id);
        setExistingImage(
          `https://e-commerse-backend-ig4l.onrender.com/product/product-photo/${product._id}`
        );
      } else {
        setError("Failed to fetch product details");
      }
    } catch (err) {
      setError("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  // Handle form submission
  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);
      if (photo) {
        formData.append("photo", photo);
      }

      const response = await fetch(
        `https://e-commerse-backend-ig4l.onrender.com/product/update-product/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Product updated successfully!");
        setTimeout(() => {
          navigate("/dashboard/admin/Products");
        }, 1500);
      } else {
        setError(data.message || "Failed to update product");
      }
    } catch (err) {
      setError("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `https://e-commerse-backend-ig4l.onrender.com/product/product-delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Product deleted successfully!");
        setTimeout(() => {
          navigate("/dashboard/admin/Products");
        }, 1500);
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h3 className="mb-0">Update Product</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSuccess("")}
                >
                  {success}
                </Alert>
              )}

              <Form onSubmit={updateProduct}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="0"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Product Image</Form.Label>
                  {existingImage && (
                    <div className="mb-2">
                      <p className="small">Current Image:</p>
                      <img
                        src={existingImage}
                        alt="Product"
                        className="img-thumbnail mb-2"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  )}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  <Form.Text className="text-muted">
                    Leave empty to keep current image
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button
                    variant="outline-danger"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={loading}
                  >
                    Delete Product
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
