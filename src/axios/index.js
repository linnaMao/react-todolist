import {  
  insertTodoServer, 
  getListByTypeServer, 
  finishedServer, 
  starServer,
  deleteItemServer,
  addMyDayServer,
  addRemarkServer,
  addStepServer,
  deleteStepServer,
  stepFinishServer,
  modifyStepServer,
  modifyTitleServer,
  hideFinishedServer
} from '../server'
export function insertTodo (todo) {
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

export function deleteItem(id) {
  return deleteItemServer(id)
}

export function addMyDay(id) {
  return addMyDayServer(id)
}

export function addRemark(id, value) {
  return addRemarkServer(id, value)
}

export function addStep(id, step) {
  return addStepServer(id, step)
}

export function deleteStep(id, step) {
  return deleteStepServer(id, step)
}

export function stepFinish(todoId, stepId) {
  return stepFinishServer(todoId, stepId)
}

export function modifyStep(todoId, stepId, value) {
  return modifyStepServer(todoId, stepId, value)
}

export function modifyTitle(todoId, value) {
  return modifyTitleServer(todoId, value)
}

export function hideFinished(type) {
  return hideFinishedServer(type)
}