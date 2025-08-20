import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
        <h4 className="text-center mb-4 text-primary fw-bold">Add Category</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="p-3 rounded-3 shadow-sm"
              style={{ borderColor: "#0d6efd" }}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              className="fw-semibold py-2 rounded-3 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg, #6610f2, #0d6efd)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg, #0d6efd, #6610f2)")
              }
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
