
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFavorites } from "../features/favoriteSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.get(
      `/users?email=${email}&password=${password}`
    );

    if (response.data.length > 0) {
      localStorage.setItem(
        "user",
        JSON.stringify(response.data[0])
      );

      dispatch(loadUserFavorites());

      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
