var mongoose = require("mongoose")



var User = mongoose.model('User', {
    email:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    }
})

// var newUser = new User({
//     email:'cook something hungry33'
// })

// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined, 2))
    
// }, (e)=>{
//     console.log(e)
// })

module.exports = {
    User
}