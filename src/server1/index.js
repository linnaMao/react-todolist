import { all } from "q"
import { constants } from "zlib"

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

export function finishedServer(id) {
  const allTodo = getItem("todoItem")
  // 设置finished
  const res = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isFinish: !item.isFinish
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function starServer(id) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map(item => {
    if (item.id === id) {
      return {
        ...item,
        isStar: !item.isStar
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function insertStepServer(id,step) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        step
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
  console.log(res)
}

export function stepFinishServer(todoId, stepId) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if (item.id === todoId) {
      return {
        ...item,
        step: item.step.map((item) => {
          if (item.id === stepId) {
            return {
              ...item,
              isFinish: !item.isFinish
            }
          }
          return {...item}
        })
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function changeContentServer(todoId, stepId, value) {
  console.log(todoId, stepId, value)
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if (item.id === todoId) {
      return {
        ...item,
        step: item.step.map((item) => {
          if (item.id === stepId) {
            return {
              ...item,
              title: value
            }
          }
          return {...item}
        })
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
  console.log(res)
}