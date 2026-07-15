const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 假数据：先写死一个账号密码，方便你马上看到“登录成功”
const DEMO_USER = { email: "test@gamebuddy.com", password: "123456" };

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // 先随便返回一个 token 字符串（后面我们再做真正的安全版本）
    return res.json({ token: "demo-token-123" });
  }

  return res.status(401).json({ message: "Wrong email or password" });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:5173");
});