import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlusCircle, FaArrowLeft, FaImage } from "react-icons/fa";

export const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const auth = useAuth();
  const navigate = useNavigate();

  const getallcategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/category/all-category"
      );
      const data = await response.json();
      setCategories(data.categories || []);
      if (data.categories?.length > 0) {
        setCategory(data.categories[0]._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getallcategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Valid price is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!quantity || isNaN(quantity) || quantity < 0)
      newErrors.quantity = "Valid quantity is required";
    if (!category) newErrors.category = "Category is required";
    if (!photo) newErrors.photo = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addproduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const prod = new FormData();
      prod.append("name", name);
      prod.append("price", price);
      prod.append("description", description);
      prod.append("quantity", quantity);
      prod.append("category", category);
      prod.append("photo", photo);

      const response = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/product/create-product",
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
          },
          body: prod,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <Button
        variant="outline-primary"
        className="mb-4 d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" /> Back to Products
      </Button>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaPlusCircle className="fs-4 me-2" />
                <h4 className="mb-0">Create New Product</h4>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              <Form onSubmit={addproduct}>
                <Row>
                  {/* Left Column - Form Fields */}
                  <Col md={7}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Category</Form.Label>
                      {isLoading ? (
                        <div className="d-flex align-items-center">
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          <span>Loading categories...</span>
                        </div>
                      ) : (
                        <>
                          <Form.Select
                            className={`${errors.category ? "is-invalid" : ""}`}
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categories.map((c) => (
                              <option value={c._id} key={c._id}>
                                {c.name}
                              </option>
                            ))}
                          </Form.Select>
                          {errors.category && (
                            <Form.Text className="text-danger">
                              {errors.category}
                            </Form.Text>
                          )}
                        </>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Product Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                      />
                      {errors.name && (
                        <Form.Text className="text-danger">
                          {errors.name}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!errors.description}
                      />
                      {errors.description && (
                        <Form.Text className="text-danger">
                          {errors.description}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">
                            Price (₹)
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            isInvalid={!!errors.price}
                          />
                          {errors.price && (
                            <Form.Text className="text-danger">
                              {errors.price}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-semibold">
                            Quantity
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            isInvalid={!!errors.quantity}
                          />
                          {errors.quantity && (
                            <Form.Text className="text-danger">
                              {errors.quantity}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  {/* Right Column - Image Upload */}
                  <Col md={5}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-block">
                        Product Image
                      </Form.Label>

                      <div className="d-flex flex-column align-items-center">
                        {photoPreview ? (
                          <div className="mb-3 position-relative">
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="img-fluid rounded border"
                              style={{ maxHeight: "200px" }}
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0 m-1"
                              onClick={() => {
                                setPhoto(null);
                                setPhotoPreview(null);
                              }}
                            >
                              ×
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-light border rounded d-flex flex-column align-items-center justify-content-center p-5 w-100 mb-3">
                            <FaImage className="fs-1 text-muted mb-2" />
                            <span className="text-muted">
                              No image selected
                            </span>
                          </div>
                        )}

                        <div className="w-100">
                          <Form.Control
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            isInvalid={!!errors.photo}
                            className="d-none"
                            id="product-image-upload"
                          />
                          <label
                            htmlFor="product-image-upload"
                            className="btn btn-outline-primary w-100"
                          >
                            Choose Image
                          </label>
                          {errors.photo && (
                            <Form.Text className="text-danger d-block">
                              {errors.photo}
                            </Form.Text>
                          )}
                          <Form.Text className="text-muted d-block mt-1">
                            Recommended size: 800x800px, JPG/PNG format
                          </Form.Text>
                        </div>
                      </div>
                    </Form.Group>

                    <div className="d-grid mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="d-flex align-items-center justify-content-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            Creating Product...
                          </>
                        ) : (
                          <>
                            <FaPlusCircle className="me-2" />
                            Create Product
                          </>
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
