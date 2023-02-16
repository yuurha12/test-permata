require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../permata-test/server/swagger-output.json')

const router = require("./src/routes");

mongoose.set("strictQuery", false);

const app = express();
const port = 5000;

app.use(cors()); // enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => console.log(`Listening on port ${port}!`));

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected successfully");
});
