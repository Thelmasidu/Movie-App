import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some((user: any) => user.email === email);

    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    setSuccess("Account created successfully. Redirecting to login...");

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10} p={4} borderRadius={2} boxShadow={3}>
      <Typography variant="h5" gutterBottom>
        Create an Account
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
