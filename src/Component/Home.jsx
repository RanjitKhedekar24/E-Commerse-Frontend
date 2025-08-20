import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaRupeeSign, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/cart";

export const Home = () => {
  const [categories, setCatgeories] = useState([]);
  const [prods, setProds] = useState([]);
  const [checked, setChecked] = useState([]);
  const [cart, setCart] = useCart();

  function getallcategories() {
    fetch("http://localhost:2443/category/all-category").then((res1) => {
      res1.json().then((res2) => {
        setCatgeories(res2.categories);
      });
    });
  }

  useEffect(() => {
    getallcategories();
  }, []);

  function getallproducts() {
    fetch("http://localhost:2443/product/all-product").then((res1) => {
      res1.json().then((res2) => {
        setProds(res2.products);
      });
    });
  }

  useEffect(() => {
    getallproducts();
  }, []);

  function handleFilter(value, id) {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }

  function filterProduct() {
    let data = { checked };
    fetch("http://localhost:2443/product/filter-product", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res1) => {
      res1.json().then((res2) => {
        setProds(res2.products);
      });
    });
  }

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  return (
    <div>
      <Container>
        <Row>
          {/* === Filter Sidebar === */}
          <Col md={3} className="my-4">
            <h4 className="my-4">Filter By Category</h4>
            {categories.map((c) => {
              return (
                <Form.Check
                  type="checkbox"
                  key={c._id}
                  label={c.name}
                  className="mt-3 fs-6"
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
              );
            })}
            <Button
              variant="secondary"
              className="my-5 fs-6 px-3 w-100"
              onClick={() => window.location.reload()}
            >
              Clear Filter
            </Button>
          </Col>

          {/* === Products Section === */}
          <Col md={9}>
            <h2 className="text-center my-4">All Products</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {prods.map((p) => {
                return (
                  <Card
                    key={p._id}
                    className="h-100 shadow-sm border-0 rounded-3 overflow-hidden"
                  >
                    {/* Product Image */}
                    <div
                      className="bg-light d-flex align-items-center justify-content-center"
                      style={{ height: "200px" }}
                    >
                      <Card.Img
                        variant="top"
                        src={`http://localhost:2443/product/product-photo/${p._id}`}
                        className="img-fluid p-3"
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                        alt={p.name}
                      />
                      {p.price < 500 && (
                        <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="mb-1 fw-semibold">
                        {p.name}
                      </Card.Title>

                      {/* Ratings */}
                      <div className="d-flex align-items-center mb-2">
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} className="text-warning me-1" />
                        ))}
                        <FaStar className="text-muted me-2" />
                        <span className="small text-muted">(24)</span>
                      </div>

                      {/* Description */}
                      <Card.Text
                        className="text-muted small mb-3"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {p.description}
                      </Card.Text>

                      {/* Price + Cart Button */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <h5 className="mb-0 text-primary d-flex align-items-center">
                          <FaRupeeSign className="me-1" />
                          {p.price}
                        </h5>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                          }}
                        >
                          <FaShoppingCart className="me-1" /> Add
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
