const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: Return an array of users from /users in form of { data: Array }
app.get("/users", (req, res) => {
  res.json({ data: users });
});
// TODO: Return a single user by id from /users/:userId in form of { data: Object }
app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    return res.status(404).send(`User ID not found: ${userId}`);
  }

  res.json({ data: foundUser });
});
// TODO: Return all states from /states in the form of { data: Array }
app.get("/states", (req, res) => {
  res.json({ data: states });
});
// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get("/states/:stateCode", (req, res) => {
  const stateCode = req.params.stateCode;
  const stateName = states[stateCode];

  if (!stateName) {
    return res.status(404).send(`State code not found: ${stateCode}`);
  }

  res.json({
    data: {
      stateCode: stateCode,
      name: stateName
    }
  });
});
// TODO: Add not-found handler.
// Not-found handler
app.use((req, res) => {
  res.status(404).send(`Not found: ${req.originalUrl}`);
});
// TODO: Add error handler.
// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
});
module.exports = app;


