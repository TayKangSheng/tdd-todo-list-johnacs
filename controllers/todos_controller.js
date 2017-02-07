const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  // if (!params.name) throw new Error('Name is required')
  // if (params.name.length < 5) throw new Error('Name is too short')
  // if (!params.description) params.description = 'To do task'
  // if (!params.completed) params.completed = false

  if (params.hasOwnProperty('name') && params.name.length > 5) {
    params._id = uuidGenerator()
    todos.push(params)
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
function update (id, udatedParams) {
  if (udatedParams.hasOwnProperty('name') && udatedParams.name.length > 5) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i]._id === id) {
        todos[i].name = udatedParams.name
        todos[i].description = udatedParams.description
        todos[i].completed = udatedParams.completed
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
  if(todos.splice(deletedIndex,1)) return true
  // for (var i = 0; i < todos.length; i++) {
  //   if (id === todos[i]._id) {
  //     todos.splice(i, 1)
  //     return true
  //   }
  // }
  // return false
}

function destroyAll () {
  todos.forEach(function(todo){
    destroy(todo._id)
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
