import { useState } from "react";
import api from "../services/api";

function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration successful");
      onRegister();
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleRegister}>Register</button>
      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={onRegister}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default RegisterPage;
