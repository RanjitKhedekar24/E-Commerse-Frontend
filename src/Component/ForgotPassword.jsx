import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Alert,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaQuestionCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const response = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/auth/forgotpass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword, answer }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMsgType("success");
        setMsg("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMsgType("danger");
        setMsg(data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setMsgType("danger");
      setMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex text-center justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-4 text-primary">🔑 Reset Password</h3>
        <p className="text-center text-muted mb-4">
          Enter your details to reset your password
        </p>

        <Form onSubmit={handleSubmit}>
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

          {/* Security Question */}
          <Form.Group className="mb-3" controlId="formGroupAnswer">
            <Form.Label className="fw-semibold">Security Question</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaQuestionCircle />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Your favorite sport?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Answer the question you provided during registration
            </Form.Text>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label className="fw-semibold">New Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Create a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <Form.Text className="text-muted">
              Must be at least 8 characters
            </Form.Text>
          </Form.Group>

          {/* Feedback Message */}
          {msg && (
            <Alert variant={msgType} className="text-center py-2">
              {msg}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-bold py-2"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </Button>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => navigate("/signin")}
              className="text-decoration-none"
            >
              Back to Login
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
