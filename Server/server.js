const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

require("./Config/mongoose.config");
require("./Routes/event.routes")(app);
require("./Routes/user.routes")(app);

const server = app.listen(8000, () => {
    console.log(`Server is running  and Listening at the ${PORT} !!!!!`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        creentials: true,
    },
});

io.on("connection", (socket) => {
    //console.log('New User: ', socket.id)

    socket.on("newComment", (data) => {
        socket.broadcast.emit("newComment", data);
    });

    socket.on("delete", (data) => {
        socket.broadcast.emit("delete", data);
    });

    socket.on("newEvent", (data) => {
        socket.broadcast.emit("newEvent", data);
    });

    socket.on("deleteEvent", () => {
        socket.broadcast.emit("deleteEvent");
    });

    socket.on("statusChange", () => {
        socket.broadcast.emit("statusChange");
    });

    socket.on("disconnect", (socket) => {
        //console.log("User: " + socket.id + " disconnected")
    });
});
