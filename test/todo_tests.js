const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

console.log(todos)
// // Use Assert to Test the functionality of all your CRUD methods e.g.

var todoItem1 = {
  name: 'Peters',
  description: 'Buy bananas',
  completed: false
}
var todoItem2 = {
  name: 'John',
  description: 'Sell car',
  completed: false
}
var todoNoNameItem3 = {
  description: 'Sell house',
  completed: false
}

// assert.deepStrictEqual(todos.create({_id: name:,description:,completed:}),{},'parameter provided should be an object')

// testing create function
assert.strictEqual(todos.create(todoItem1), true, 'Should return true')
assert.strictEqual(todos.create(todoItem2), false, 'Function create, object not created, name should have at least 5 length')
assert.strictEqual(todos.create(todoNoNameItem3), false, 'Function create, object not created, no name provided')

// test list function
assert.ok(todos.list().length > 0, 'Function list should have not be empty')
assert.deepStrictEqual(typeof todos.list(), 'object', 'Function list should return an object  typeof')

console.log(todos.list())
var firstObj = todos.list()[0]
var oneId = todos.list()[0]._id
console.log(oneId)
// test show id function
assert.deepStrictEqual(typeof todos.show(oneId), 'object', 'Function show should return an object  typeof')

assert.deepStrictEqual(todos.show(oneId), firstObj, 'Function show should return an object with the id')

assert.deepStrictEqual(todos.show('da815dba-58a9-4319-8108-64c61742ed99'), null, 'Function show should return  Null if no id found')

// test destroy function
assert.strictEqual(todos.destroy('12345678'), false, 'Function destroy should return false if no id found')
console.log(todos.list())
assert.strictEqual(todos.destroy(oneId), true, 'Function destroy should return true if id found')

// test destroyAll function
todos.create(todoItem1)
todos.destroyAll()
assert.ok(todos.list().length === 0, 'Function destroyAll should return  0 length')

// test update function
var newObj = {
  name: 'LuLuLaLa',
  description: 'Buy veggie',
  completed: false
}

todos.create(todoItem1)
console.log(todos.list()[0])
var newObjId = todos.list()[0]._id

assert.strictEqual(todos.update(newObjId, newObj), true, 'Object with unique id cannot update'
)

assert.strictEqual(todos.update('233333', newObj), false, 'No id found'
)
console.log(todos.list()[0])

assert.strictEqual(todos.update(newObjId, todoItem2), false, 'Update parameter name value should be at least 5 characters long.'
)
