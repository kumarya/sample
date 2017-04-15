
var mongoose = require("mongoose")

var Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required:true,
        minlength:1
    },
    completed:{
        type:Boolean,
        default:false
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