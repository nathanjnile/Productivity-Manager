const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const mongoURI = require("./config");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Mongo
mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

// api routes

const taskRouter = require("./routes/api/task");
const columnRouter = require("./routes/api/column");
const goalRouter = require("./routes/api/goal");

app.use("/api/task", taskRouter);
app.use("/api/column", columnRouter);
app.use("/api/goal", goalRouter);


// Serve static assets if in production

if(process.env.NODE_ENV ==="production") {
    // set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});