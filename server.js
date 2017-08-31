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
    todo
        .findAll()
        .then(function (todos) {
            return res.render("index", { item: todos })
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

//ADD New todo items
app.post("/additem", (req, res) => {
    todo.create({
        item: req.body.item,
        is_complete: 'f'
    })
        .then(function (newTodo) {
            return res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

///////move them to the completed list
app.post("/completed", function (req, res) {
    todo.update({
        is_complete: 't'
    }, {
            where: {
                item: req.body.item
            }
        }).then(function (newTodo) {
            return res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

//////// CLEAR ALL ///////////
app.post("/clearall", function (req, res) {
    todo.destroy({
        where: {
            is_complete: 't'
        }
    }).then(function () {
        return res.redirect("/");
    })
        .catch(function (err) {
            res.status(500).send(err);
        });
});


//////// DELETE INDIVIDUAL TODOS ///////////
app.post("/deleteOne", function (req, res) {
    todo.destroy({
        where: {
            item: req.body.item
        }
    }).then(function () {
        return res.redirect("/");
    })
        .catch(function (err) {
            res.status(500).send(err);
        });
});


/////////////to update
app.post("/update/:id", function (req, res) {
    todo.update({
        item: req.body.item
    }, {
            where: {
                id: req.params.id
            }
        }).then(function (newTodo) {
            return res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});






app.listen(port, () => {
    console.log("server up on port", port);
});
