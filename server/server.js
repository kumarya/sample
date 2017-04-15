var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var {mongoose} = require("./db/mongoose")

var {Todo}  = require("./models/todo")

var {User}  = require("./models/user")

app.use(bodyParser.json())

//CRUD

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
        
    })
    todo.save()
      .then((createdTodo)=>{
          res.status(400).send(createdTodo)
          
      })
      .catch(error=>{
          console.log(error)
      })
    
    
    
})




app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("PORT INITIALZ")
})