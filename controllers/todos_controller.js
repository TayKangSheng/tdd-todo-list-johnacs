const uuidGenerator = require('uuid/v4')
const fs = require('fs')
const todos = require('../data.json')

// const todos = []
// // the following line will instead load the todos from a json file when the app starts

// // The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (params.hasOwnProperty('name') && params.name.length > 5) {
    params._id = uuidGenerator()
    todos.push(params)
    save()
    return true
  }

  return false
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}

function show (id) {
  // find the TODO with this id
  for (item in todos) {
    if (id === todos[item]._id) {
      return todos[item]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, updateParamas) {
  if (updateParamas.hasOwnProperty('name') && updateParamas.name.length > 5) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i]._id === id) {
        todos[i].name = updateParamas.name
        todos[i].description = updateParamas.description
        todos[i].completed = updateParamas.completed
        save()
        return true
      }
    }
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var todoById = show(id)
  var deletedIndex = todos.indexOf(todoById)

  if (!todoById) return false
  if (todos.splice(deletedIndex, 1)) {
    save()
    return true
  }
}

function destroyAll () {
  for (var i = todos.length - 1; i >= 0; i--) {
  todos.pop()
  save()
  return true
}
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
