const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

require("./Config/mongoose.config");
require("./Routes/event.routes")(app);
require("./Routes/user.routes")(app);

app.listen(8000, () => {
  console.log(`Server is running  and Listening at the ${PORT} !!!!!`);
});
