

const mongoose  = require("mongoose")

mongoose.Promise = global.Promise

//mongo ds161400.mlab.com:61400/node -u info -p zxc123

//mongodb://info:zxc123@ds161400.mlab.com:61400/node

mongoose.connect('mongodb://info:zxc123@ds161400.mlab.com:61400/node')

//mongodb://info:zxc123@ds161400.mlab.com:61400/node

module.exports = {
    mongoose
}


