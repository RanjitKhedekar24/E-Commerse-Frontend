import React, { useState } from "react";
import { Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/auth";

export const SignIn = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msgType, setMsgType] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const res = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/auth/signIn",
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
        setMsg("Login Successful! Redirecting...");
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMsgType("danger");
        setMsg(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setMsgType("danger");
      setMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-4 text-primary">🔐 User Login</h3>

        <Form onSubmit={handleSignIn}>
          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

          {/* Feedback Message */}
          {msg && (
            <Alert variant={msgType} className="text-center py-2">
              {msg}
            </Alert>
          )}

          {/* Sign In Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 my-3 fw-bold"
          >
            Sign In
          </Button>

          {/* Sign Up Navigation */}
          <Button
            onClick={() => navigate("/SignUp")}
            variant="outline-secondary"
            type="button"
            className="w-100 fw-semibold"
          >
            Create New Account
          </Button>
          <Link
            to="/forgotpass"
            className="d-block text-center mt-3 text-decoration-none"
          >
            Forgot Password?
          </Link>
        </Form>
      </Card>
    </div>
  );
};
