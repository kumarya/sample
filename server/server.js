var express = require("express")
var app = express()
var cors = require('cors')
const _ = require("lodash")
var bodyParser = require("body-parser")
var {mongoose} = require("./db/mongoose")



var {Todo}  = require("./models/todo")

var {User}  = require("./models/user")

var {authenticate} = require("./middleware/authenticate")



app.use(bodyParser.json())
app.use(cors());

//CRUD

//user/me
app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user)
    
})


///

//logout

app.delete('/signout', authenticate, (req, res)=>{
  
  req.user.removeToken(req.token)
    .then(()=>{
      res.status(200).send()
      
    })
    .catch(err=>{
      res.status(400).send(err)
    })
  
})


//logout ends



//login

app.post('/login', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password'])
  User.findByCredentials(body.email, body.password)
    .then(user=>{
      return user.generateAuthToken()
        .then((token)=>{
          
          res.header('x-auth', token).send(user)
          
        })
    })
    .catch(error=>{
      res.status(400).send(error)
    })
  
  
})

//login ends

//user 

app.post('/signup', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)
  user.save()
    .then((user)=>{
      return user.generateAuthToken()
        .then((token)=>{
          res.header('x-auth', token).send(user)
        })
      
      //res.send(user)
    })
    .catch(error=>{
      res.send(error)
    })
  
  
  
})

// user creation ends

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

//POST Todos

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator:req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//end POST Todos



//id

app.get('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id
  
  Todo.findOne({
    _id:id,
    _creator:req.user._id
  })
    .then(todo=>{
      res.send({todo})
    })
    .catch(error=>{
      res.status(400).send(error)
    })
})

app.patch('/todos/:id', authenticate, (req, res)=>{
  const body = _.pick(req.body, ['text', 'completed'])
  var id = req.params.id
  
  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
    
  }, {$set:body}, {new:true})
    .then(todo=>{
      res.send({todo})
      console.log(todo)
    })
    .catch(err=>{
      res.send(err)
      console.log(err)
    })

  
})


app.delete('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id
  
  Todo.findOneIdAndRemove({
    _id:id,
    _creator:req.user._id
  })
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