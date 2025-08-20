import React from "react";
import { useSearch } from "../context/search";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaRupeeSign } from "react-icons/fa";
import { useCart } from "../context/cart";
export const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <div>
      <Container>
        <h2>Search Result</h2>
        <h4>
          {values?.result.length < 1
            ? "No Products Found"
            : Total`${values.result.length} products Found`}
        </h4>
        <div class="row row-cols-1 row-cols-md-3 gap-4">
          {values.result.map((p, i) => {
            return (
              <Card
                style={{ width: "18rem" }}
                className="text-center shadow border-0 h-100"
                key={p._id}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:2443/product/product-photo/${p._id}`}
                  className="h-50 w-50 mx-auto d-block"
                />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>
                    <h5>{p.description}</h5>
                    <h5>
                      <FaRupeeSign /> {p.price}
                    </h5>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    }}
                  >
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
