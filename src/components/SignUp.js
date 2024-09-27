import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";

const SignUp = (props) => {
  const history = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth-token in local storage and redirect
      localStorage.setItem("token", json.token);
      props.showAlert("Account Created Successfully", "success");
      history("/home");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }

    setCredentials({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          onChange={onChange}
          required
          inputProps={{ minLength: 5 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          onChange={onChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          onChange={onChange}
          required
          inputProps={{ minLength: 6 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="cpassword"
          onChange={onChange}
          required
          inputProps={{ minLength: 6 }}
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
