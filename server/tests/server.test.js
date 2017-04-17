const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require("mongodb")

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  
    {
      _id: new ObjectID(),
      text:'New data'
    },
    {
      _id: new ObjectID(),
      text:'very new data'
    }
  
  
  ]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  
  it('should not create todo wiht invalid body data', (done)=>{
      
      request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err, res)=>{
           if(err){
               return done(err)
           }
           Todo.find().then(todos=>{
               expect(todos.length).toBe(2)
               done()
               
           }).catch(err=>{
               done(err)
           })
       })
       
      
  })
  
 

  
});

describe('#GET/ Todos', ()=>{
  it('should get all list', (done)=>{
    request(app)
      .get('/todos')
      .expect(201)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2)
        })
        .end(done)
      
      
    })
    
})

describe('# GET/ :todo', ()=>{
  
  it('should get an id', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text)
        
      })
      .end(done)
    
    
  })
  
})