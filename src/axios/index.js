import { insertTodoServer, getListByTypeServer } from '../server'
export function insertTodo (todo) {
  insertTodoServer(todo)
}

export function getListByType(type) {
  return getListByTypeServer(type)
}