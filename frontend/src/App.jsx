import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("Logging in...");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || "Login failed");
        return;
      }

      // 先把“登录成功的信息”存起来（后续做真正登录保持会用到）
      localStorage.setItem("token", data.token);

      setMsg("Login success ✅ token saved!");
    } catch (err) {
      setMsg("Cannot connect to backend (is it running?)");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>GameBuddy</h1>
        <p style={styles.subtitle}>Login</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <div style={styles.msg}>{msg}</div>

        <div style={styles.links}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
          <span> · </span>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Create account
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0b1220",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#121a2a",
    border: "1px solid #26324a",
    borderRadius: 16,
    padding: 24,
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  title: { margin: 0, fontSize: 28, fontWeight: 800 },
  subtitle: { marginTop: 6, marginBottom: 18, color: "#a7b3cf" },
  form: { display: "grid", gap: 10 },
  label: { fontSize: 14, color: "#c9d2e8" },
  input: {
    padding: "12px 12px",
    borderRadius: 10,
    border: "1px solid #2a3856",
    background: "#0f1726",
    color: "white",
    outline: "none",
  },
  button: {
    marginTop: 8,
    padding: "12px 12px",
    borderRadius: 10,
    border: "none",
    background: "#4f7cff",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  msg: { marginTop: 12, minHeight: 22, color: "#d7def2" },
  links: { marginTop: 10, color: "#a7b3cf" },
};