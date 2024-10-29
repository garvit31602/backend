const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(5002, () => console.log("Server ready on port 5002."));

module.exports = app;