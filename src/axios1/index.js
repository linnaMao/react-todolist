import { 
  insertTodoServer, 
  getListByTypeServer, 
  finishedServer,
  starServer,
  insertStepServer,
  stepFinishServer,
  changeContentServer
} from '../server1';

export function insertTodo(todo) {
  return insertTodoServer(todo)
}

export function getListByType(type) {
  return getListByTypeServer(type)
}

export function finished(id) {
  return finishedServer(id)
}

export function star(id) {
  return starServer(id)
}

export function insertStep(id,step) {
  return insertStepServer(id,step)
}

export function stepFinish(todoId, stepId) {
  stepFinishServer(todoId, stepId)
}

export function changeContent(todoId, stepId, value) {
  changeContentServer(todoId, stepId, value)
}
