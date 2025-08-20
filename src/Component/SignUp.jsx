import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { useAuth } from "../context/auth";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const { auth, setAuth } = useAuth();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success | danger
  const [showPassword, setShowPassword] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    const user = { name, email, password, address, phone, answer };

    try {
      const res = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/auth/signUp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMsgType("success");
        setMsg("Registration successful!,Login Now");
        setTimeout(() => navigate("/SignIn"), 1500);
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setPhone("");
        setAnswer("");
      } else {
        setMsgType("danger");
        setMsg(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMsgType("danger");
      setMsg("Server error. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-primary">📝 User Registration</h3>

        <Form onSubmit={addUser}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Control
              type="text"
              placeholder="Address"
              className="text-center"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Control
              type="text"
              placeholder="Phone (10 digits)"
              className="text-center"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="\d{10}"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupAnswer">
            <Form.Control
              type="text"
              placeholder="What is your favourite sport?"
              className="text-center"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </Form.Group>

          {/* Message display under form */}
          {msg && (
            <Alert variant={msgType} className="text-center py-2">
              {msg}
            </Alert>
          )}

          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
};
