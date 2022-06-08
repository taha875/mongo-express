const express = require("express");
const db = require("./models/index");
const router = require("./routes/routes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app = express();

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database");
  })
  .catch(() => {
    console.log("Error");
  });
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    exposedHeaders: "Access-Control-Allow-Method,Access-Control-Allow-Origin,Content-Type,Content-Length",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Application!" });
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server Started On :" + PORT));
