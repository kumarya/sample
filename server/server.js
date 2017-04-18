var express = require("express")
var app = express()
var cors = require('cors')
const _ = require("lodash")
var bodyParser = require("body-parser")
var {mongoose} = require("./db/mongoose")

var {Todo}  = require("./models/todo")

var {User}  = require("./models/user")

app.use(bodyParser.json())
app.use(cors());

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

app.patch('/todos/:id', (req, res)=>{
  const body = _.pick(req.body, ['text', 'completed'])
  
  Todo.findByIdAndUpdate(req.params.id, {$set:body}, {new:true})
    .then(todo=>{
      res.send({todo})
      console.log(todo)
    })
    .catch(err=>{
      res.send(err)
      console.log(err)
    })

  
})


app.delete('/todos/:id', (req, res)=>{
  Todo.findByIdAndRemove(req.params.id)
    .then((todo)=>{
      res.send('todo removed')
      console.log(todo)
    })
    .catch(error=>{
      console.log(error)
    })
})

//
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("PORT INITIALZ")
})

module.exports = {
    app
}