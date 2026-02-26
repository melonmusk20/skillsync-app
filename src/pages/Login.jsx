import { useState } from "react";
import { loginCustomer } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (k) => (e) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      const data = await loginCustomer(form);
      console.log("LOGIN RESPONSE:", data);

      
      const token = typeof data === "string" ? data : (data?.token || data?.accessToken || data?.jwt);

      if (!token) {
        setMsg("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);

      setMsg("Login Success ✅");
      setTimeout(() => nav("/"), 800);

    } catch (err) {
      setMsg(
        err?.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <div className="card lift auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtext">
          Login to continue using Resume Matcher
        </p>

        <form onSubmit={submit} className="form">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange("email")}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange("password")}
          />

          <button
            className="btn primary full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && <div className="auth-msg">{msg}</div>}
      </div>
    </div>
  );
}