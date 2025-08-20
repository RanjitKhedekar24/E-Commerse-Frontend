import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaRegUserCircle } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { useAuth } from "../context/auth";

export const AdminDashboard = () => {
  const { auth } = useAuth();
  const { name, email, address, phone, answer } = auth?.user || {};

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="shadow-lg border-0 rounded-4 p-4"
              style={{
                background: "linear-gradient(to right, #f0f2f5, #ffffff)",
              }}
            >
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <div
                    className="bg-dark rounded-circle d-flex justify-content-center align-items-center mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <FaRegUserCircle size={100} color="white" />
                  </div>
                </Col>

                <Col md={8}>
                  <h3 className="fw-bold text-primary">{name}</h3>
                  <p className="text-muted mb-2">
                    <strong>Email:</strong> {email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {phone || "N/A"}
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong> {address || "N/A"}
                  </p>
                  <p className="mb-0">
                    <strong>Question:</strong>What is your favourite sport ?
                    <br />
                    <strong>Answer:</strong> {answer || "N/A"}
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
