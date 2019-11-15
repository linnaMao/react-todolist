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
  const res = allTodo.map((item) => {
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

export function deleteItemServer(id) {
  const allTodo = getItem("todoItem")
  const res = allTodo.filter((item) => {
    return item.id !== id
  })
  setItem("todoItem", res)
}


