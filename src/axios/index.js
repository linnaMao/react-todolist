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
  getTitleListServer,
  insertTitleServer,
  deleteTitleSever
} from '../server'
export function insertTodo (todo) {
  return insertTodoServer(todo)
}

export function getListByType(id) {
  return getListByTypeServer(id)
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

// 获取左侧标题
export function getTitleList() {
  return getTitleListServer()
}

// 新增左侧标题
export function insertTitle(titleValue) {
  return insertTitleServer(titleValue)
}

// 删除左侧标题
export function deleteTitle(id) {
  return deleteTitleSever(id)
}