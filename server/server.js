const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

const userRoutes = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "The API is up and running!" });
});

app.listen(port, () => {
  console.log(`Your server is running on port: localhost: ${port}`);
});
