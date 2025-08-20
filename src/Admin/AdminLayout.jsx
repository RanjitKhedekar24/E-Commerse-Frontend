import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Adminmenu } from "./Adminmenu";

export const AdminLayout = () => {
  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Row>
        <Col md={3} className="mb-4 mb-md-0">
          <Adminmenu />
        </Col>
        <Col md={9}>
          <Outlet /> {/* 🔁 This will render child admin pages */}
        </Col>
      </Row>
    </Container>
  );
};
