
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const matchingUser = storedUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (matchingUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchingUser));
      navigate("/home");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      borderRadius={2}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        Sign In to Your Account
      </Typography>
      <form onSubmit={handleLogin} style={{ width: "100%" }}>
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        New user?{" "}
        <Link href="/signup" underline="hover">
          Create an account
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
