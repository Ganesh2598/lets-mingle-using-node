const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./database");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const cors = require("cors");

app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}))
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());
app.use(auth);
app.use(user);
app.use(post);

db.connection.sync({force : true})
    .then(()=>{
        console.log("recreated")
    })

app.listen(5000,()=>{
    console.log("Listening")
})