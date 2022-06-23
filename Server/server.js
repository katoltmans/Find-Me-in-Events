require("./Config/mongoose.config");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(8000, () => {
  console.log(`Server is running  and Listening at the ${PORT} !!!!!`);
});
