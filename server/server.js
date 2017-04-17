var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var {mongoose} = require("./db/mongoose")

var {Todo}  = require("./models/todo")

var {User}  = require("./models/user")

app.use(bodyParser.json())

//CRUD
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});



app.get('/todos', (req, res)=>{
  
  Todo.find().then((todos)=>{
    res.send({
      todos:todos
    })
    .catch(error=>{
      res.status(400).send(error)
      console.log(error)
    })
  })
})

//id

app.get('/todos/:id', (req, res)=>{
  Todo.findById(req.params.id)
    .then(todo=>{
      res.send({todo})
    })
    .catch(error=>{
      res.status(400).send(error)
    })
})



//
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("PORT INITIALZ")
})

module.exports = {
    app
}