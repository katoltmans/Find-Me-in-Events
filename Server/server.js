const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT;


app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
require("./Config/mongoose.config");
require('./Routes/event.routes')(app)

app.use(cookieParser());

app.listen(8000, () => {
  console.log(`Server is running  and Listening at the ${PORT} !!!!!`);
});
