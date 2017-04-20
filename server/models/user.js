const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

var userSchema = new mongoose.Schema(
    
    {
    email:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
        unique:true,
        validate:{
            isAsync:false,
            validator:validator.isEmail,
            message:'{value} is not a valid email'
        }
    },
    password: {
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
            
        },
        token:{
            type:String,
            required:true
            
        }
    }]
}
    
    
    
)

userSchema.methods.toJSON = function(){
    
    var user = this
    
    var userObject = user.toObject()
    
    return _.pick(userObject, ['_id', 'email'])
}

userSchema.methods.generateAuthToken = function (){
    var user =this;
    var access = 'auth'
    
    var token = jwt.sign({
        _id:user._id.toHexString(), access
    }, 'abc123').toString();
    
    user.tokens.push({
        access,
        token
    });
    return user.save()
      .then(()=>{
          return token
      })
};


//model method not like instance method
userSchema.statics.findByToken = function(token){
    
    var User = this;
    var decoded;
    
    try{
        
        decoded = jwt.verify(token, 'abc123')
        
    } catch (e){
        
        return Promise.reject()
        
    }
    
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
        
    })
    
    
}

//model method ended
var User = mongoose.model('User', userSchema)

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