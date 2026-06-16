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
  res.status(200).send({ message: "The API is up and running!" });
});

app.listen(port, () => {
  console.log(`Your server is running on port: localhost: ${port}`);
});
