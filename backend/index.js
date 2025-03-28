const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;

const dbConnect = require("./utils/dbConnect");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Welcome to the API"
    })
})

app.listen(port, () => {
    console.log(`[INFO] Server is running on port ${port}`);
    dbConnect();
})