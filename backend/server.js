const express = require("express");
const app = express();


const body_parser = require("body-parser");

const fs = require("fs");


app.use(express.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(express.static("../"));

const port = 3000;

const users = {
    id_index: 2,
    
    sessions: [
        {
            id: 2,
            username: "Jacob"
        }
    ]
}

function fetch(path) {
    return JSON.parse(fs.readFileSync("./data/" + path));
}


app.post("/post", (req, res) => {

});

app.get("/posts/:id", (req, res) => {
    res.send(req.params.id);
});

app.post("/auth", (req, res) => {
    console.log("reg.body: ", req.body);
    const username = req.body.username;
    const password = req.body.password;

    const user_data = fetch("users.json");
    
    const user = users.sessions.filter(function(username) { users.username === username});
    if (user != undefined || username === undefined || password === undefined) {
        if (user.password === password) { // correct username & password
            users.sessions.push(
                {
                    id: users.id_index++,
                    username: username
                }
            )
        
            console.log(`[*] username"${username}", password"${password}": Authenticated`);
        }
    }
});

app.listen(port, () => {
    console.log(`[*] Listening on localhost:${port}`);
});