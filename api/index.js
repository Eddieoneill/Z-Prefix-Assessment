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

module.exports = app;
