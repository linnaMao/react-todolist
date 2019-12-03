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
  deleteTitleSever,
  clearMyDayServer,
  modifyListTitleServer
} from '../server'
export function insertTodo (value, titleId, isStar, isAddMyDay) {
  return insertTodoServer(value, titleId, isStar, isAddMyDay)
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

export function addStep(id, value) {
  return addStepServer(id, value)
}

export function deleteStep(stepId) {
  return deleteStepServer(stepId)
}

export function stepFinish( stepId) {
  return stepFinishServer( stepId)
}

export function modifyStep(stepId, value) {
  return modifyStepServer(stepId, value)
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
export function deleteTitle(titleId) {
  return deleteTitleSever(titleId)
}

// 我的一天仅存在当天
export function clearMyDay() {
  return clearMyDayServer()
}

export function modifyListTitle(titleId, value) {
  return modifyListTitleServer(titleId, value)
}