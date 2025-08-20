import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useAuth } from "../context/auth";
import { CategoryForm } from "./CategoryForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { PencilSquare, Trash, PlusCircle } from "react-bootstrap-icons";

export const Createcategory = () => {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Handle create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setFormLoading(true);
    try {
      const { data } = await axios.post(
        "https://e-commerse-backend-ig4l.onrender.com/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data.success) {
        toast.success("Category created successfully");
        setName("");
        getAllCategories();
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating category");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit category
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setFormLoading(true);
    try {
      const { data } = await axios.put(
        `https://e-commerse-backend-ig4l.onrender.com/category/update-category/${selectedCategory._id}`,
        { name: editName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data.success) {
        toast.success("Category updated successfully");
        setShowEditModal(false);
        getAllCategories();
      } else {
        toast.error(data.message || "Failed to update category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating category");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete category
  const handleDelete = async () => {
    setFormLoading(true);
    try {
      const { data } = await axios.delete(
        `https://e-commerse-backend-ig4l.onrender.com/category/delete-category/${selectedCategory._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data.success) {
        toast.success("Category deleted successfully");
        setShowDeleteModal(false);
        getAllCategories();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting category");
    } finally {
      setFormLoading(false);
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://e-commerse-backend-ig4l.onrender.com/category/all-category"
      );
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4 text-primary">
            <PlusCircle className="me-2" />
            Category Management
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Create New Category
              </Card.Title>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
                loading={formLoading}
                buttonText="Create Category"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Category List</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading categories...</p>
                </div>
              ) : categories.length === 0 ? (
                <p className="text-center py-4 text-muted">
                  No categories found
                </p>
              ) : (
                <Table striped bordered hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th className="bg-light">#</th>
                      <th className="bg-light">Category Name</th>
                      <th className="bg-light text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{cat.name}</td>
                        <td className="text-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openEditModal(cat)}
                          >
                            <PencilSquare /> Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => openDeleteModal(cat)}
                          >
                            <Trash /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            value={editName}
            setValue={setEditName}
            handleSubmit={handleEditSubmit}
            loading={formLoading}
            buttonText="Update Category"
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the category:{" "}
            <span className="fw-bold text-danger">
              {selectedCategory?.name}
            </span>
            ?
          </p>
          <p className="text-muted">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={formLoading}
          >
            {formLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
