var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json())

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

data = [{
    id: 1,
    first_name: "Leonardo",
    last_name: "da Vinci"
}];

app.get("/instructors", (req, res, next) => {
    res.json(data);
});

app.delete("/instructors/:id", (req, res, next) => {
    const index = data.findIndex(x => x.id == req.id);
    data.splice(index, 1);

    res.json(data);
});

app.put("/instructors/:id", (req, res, next) => {
    let index = data.findIndex(x => x.id == req.body.id);
    data[index] = req.body;

    res.json(data);
});

app.post("/instructors", (req, res, next) => {
    var latest = data[data.length - 1];

    if (latest === undefined) req.body.id = 1;
    else req.body.id = latest.id + 1;

    data.push(req.body);
    
    res.json(data);
});