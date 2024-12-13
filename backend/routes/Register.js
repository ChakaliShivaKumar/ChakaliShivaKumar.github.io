const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User"); // Path to the user schema file

const app = express();
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user", details: error.message });
  }
});
