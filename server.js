const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");

// var products = [
//     {
//         id: 1,
//         name: "laptop"
//     },
//     {
//         id: 2,
//         name: "microwave"
//     }
// ];
//var currentId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Create connect
const db = mysql.createConnection({
    host: "localhost",
    user: "mga",
    password: "123",
    database: "nodemysql"
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MySQL connected...");
});

// GET posts
app.get("/getposts", function (req, res) {
    //res.send({ products: products });
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

// INSERT post
app.post("/create-post", function (req, res) {
    const title = req.body.title;
    //console.log(req);
    // currentId++;
    // posts.push({
    //     id: currentId,
    //     title: title
    // });
    // res.send("success");

    let post = {title: title}
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

// UPDATE post
app.get("/updatepost/:id", function(req, res) {
    // var id = req.params.id;
    // var newName = req.body.newName;
    // var found = false;

    // products.forEach(function(products, index) {
    //     if (!found && products.id === Number(id)) {
    //         products.name = newName;
    //     }
    // });
    // res.send("Success");

    let newTitle = req.query.newTitle;
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send("Success");
    });
});

// DELETE post
app.delete("/deletepost/:id", function(req, res) {
    // var id = req.params.id;
    // var found = false;

    // products.forEach(function(product, index) {
    //     if (!found && product.id === Number(id)) {
    //         products.splice(index, 1);
    //     }
    // });
    // res.send("Success");

    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send("Post deleted...");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
