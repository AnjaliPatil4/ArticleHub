import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth-token in local storage and redirect
      localStorage.setItem("token", json.token);
      history("/notes");
      props.showAlert("Logged In Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setCredentials({ email: "", password: "" });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <FormControlLabel
          control={<Checkbox id="exampleCheck1" />}
          label="Remember me"
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Login;
