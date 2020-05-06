const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const config = require("config");
const mongoose = require("mongoose");
const dbUrl = config.get("mongoUrl");

const indexRouter = require("./routes/index");
//set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// mongodb setup
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose..."));

// routes
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
