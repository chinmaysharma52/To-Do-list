const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const dataFile = path.join(__dirname, "data.json");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/tasks", (req, res) => {

    console.log("POST /api/tasks hit");
    console.log(req.body);
    const task = req.body;

    fs.readFile(dataFile, "utf-8", (err, data) => {
        let tasks = [];

        if (data && data.length > 0) {
            tasks = JSON.parse(data);
        }

        tasks.push(task);

        fs.writeFile(dataFile, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                res.status(500).json({ success: false });
            } else {
                res.json({ success: true });
            }
        });
    });
});

app.listen(3000, () => {
    console.log("Server Started.....");
});
