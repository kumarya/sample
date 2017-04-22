
var mongoose = require("mongoose")

var Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

// var newTodo = new Todo({
//     text:'cook something hungry33',
//     completed:true
// })

// newTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined, 2))
    
// }, (e)=>{
//     console.log(e)
// })

module.exports = {
    Todo
}