const express = require("express");
const cors = require("cors");
const authRoutes = require("../server/routes/auth");
const userRoutes = require("../server/routes/users");
const itemRoutes = require("../server/routes/item");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/item", itemRoutes);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "The API is up and running!",
    endpoints: [
      { method: "POST", path: "/api/auth/register" },
      { method: "POST", path: "/api/auth/login" },
      { method: "POST", path: "/api/auth/logout" },
      { method: "GET",  path: "/api/users" },
      { method: "GET",  path: "/api/users/:id" },
      { method: "GET",  path: "/api/item" },
      { method: "GET",  path: "/api/item/:id" },
      { method: "POST", path: "/api/item/create" },
      { method: "POST", path: "/api/item/:id" },
      { method: "DELETE", path: "/api/item/:id" },
    ],
  });
});

module.exports = app;
