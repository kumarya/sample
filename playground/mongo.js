const mongoose  = require("mongoose")

//mongo ds161400.mlab.com:61400/node -u info -p zxc123

//mongodb://info:zxc123@ds161400.mlab.com:61400/node

mongoose.connect('mongodb://info:zxc123@ds161400.mlab.com:61400/node', (err, db)=>{
    if(err){
        return console.log('error occured', err)
    }
    
    console.log('connected to mlab database')
    // db.mynewcollection('node').insertOne({
    //     text:'something to do',
    //     completed:false
        
    // }, (err, result)=>{
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })
})