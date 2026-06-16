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
      { method: "POST", path: "localhost:8000/auth/register" },
      { method: "POST", path: "localhost:8000/auth/login" },
      { method: "POST", path: "localhost:8000/auth/logout" },
      { method: "GET", path: "localhost:8000/users" },
      { method: "GET", path: "localhost:8000/users/:id" },
      { method: "GET", path: "localhost:8000/item" },
      { method: "GET", path: "localhost:8000/item/:id" },
      { method: "POST", path: "localhost:8000/item/create" },
      { method: "POST", path: "localhost:8000/item/:id" },
      { method: "DELETE", path: "localhost:8000/item/:id" },
    ],
  });
});

app.listen(port, () => {
  console.log(`Your server is running on port: localhost: ${port}`);
});
