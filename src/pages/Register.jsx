import { useState } from "react";
import { registerCustomer } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.name || !form.email || !form.password) {
      setMsg("Please fill all fields ⚠️");
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters 🔐");
      return;
    }

    try {
      setLoading(true);
      console.log("sending payload:", form);

      await registerCustomer(form);

      setMsg("Registration successful 🎉 Redirecting...");
      setTimeout(() => nav("/login"), 1200);

    } catch (err) {
      setMsg(
        err?.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <div className="card lift auth-card">
        <h2>Create Account 🚀</h2>
        <p className="subtext">
          Start optimizing your resume with AI
        </p>

        <form onSubmit={submit} className="form">
          <input
            className="input"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange("name")}
          />

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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {msg && <div className="auth-msg">{msg}</div>}
      </div>
    </div>
  );
}