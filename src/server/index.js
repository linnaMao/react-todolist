function getItem(name) {
  const json = localStorage.getItem(name) 
  return JSON.parse(json)
}

function setItem(name, item) {
  const newJson = JSON.stringify(item)
  localStorage.setItem(name, newJson)
}

export function insertTodoServer(todo) {
  const allTodo = getItem("todoItem")
  allTodo.push(todo)
  setItem("todoItem", allTodo)
}

export function getListByTypeServer(type) {
  const allTodo = getItem("todoItem")
  // filter过滤
  const res = allTodo.filter(i => i.type === type)
  return res
}