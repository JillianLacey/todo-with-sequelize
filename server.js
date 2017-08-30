const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
const fs = require("fs");
const models = require("./models");
const port = process.env.PORT || 8006;
const app = express();
const todo = models.todo;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static('public'));
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    todo.findAll({
        where: {
            is_complete: 'f'
        }
    }).then(function (todos) {

        return res.render("index", { item: todos })
    })
});


//New todo items
app.post("/", (req, res) => {
    todo.create({
        item: req.body.item,
        is_complete: 'f'
    })
        .then(function (newTodo) {
            return res.redirect("/");
        })
});


// app.post("/todos", (req, res) => {
//     todo.findbyId(req.params.id).then(
//         function (result) {
//             if (result.update)
//         }
//         is_complete: 't'
//     }, {
//         where: {
//             item: req.body.item
//         }
//     }).then(function (todos) { });
// return res.redirect("/");

// })

// { is_complete: todos }







app.listen(port, () => {
    console.log("server up on port", port);
});
