var async = require('async')
var inspect = require('eyespect').inspector();
function custom(param, callback) {
  var result = 'foo result'
  var err = null
  callback(err, result)
}

var items = ['item1', 'item2']
async.map(items, custom, function (err, results) {
  inspect(results, 'results')
})