const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/item");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/item", itemRoutes);

app.get("/", (req, res) => {
  res.status(200).send({
    message:
      "The API is up and running! Following are the list of endpoints you can use.",
    endpoints: [
      { method: "POST", path: "/auth/register" },
      { method: "POST", path: "/auth/login" },
      { method: "POST", path: "/auth/logout" },
      { method: "GET", path: "/users" },
      { method: "GET", path: "/users/:id" },
      { method: "GET", path: "/item" },
      { method: "GET", path: "/item/:id" },
      { method: "POST", path: "/item/create" },
      { method: "POST", path: "/item/:id" },
      { method: "DELETE", path: "/item/:id" },
    ],
  });
});

app.listen(port, () => {
  console.log(`Your server is running on port: localhost: ${port}`);
});
