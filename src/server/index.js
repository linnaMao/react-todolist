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

export function addMyDayServer(id) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type: "我的一天"
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function addRemarkServer(id, value) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if(item.id === id) {
      return {
        ...item,
        remark: value
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function addStepServer(id, step) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if(item.id === id) {
      return {
        ...item,
        step
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function deleteStepServer(id, step) {
  const allTodo = getItem("todoItem")
  const res = allTodo.map((item) => {
    if(item.id === id) {
      return {
        ...item,
        step
      }
    }
    return {...item}
  })
  setItem("todoItem", res)
}

export function stepFinishServer(todoId, stepId) {
  console.log(todoId, stepId)
  const allTodo = getItem("todoItem")
  const todoRes = allTodo.map((item) => {
    if (item.id === todoId) {
      return {
        ...item,
        step:item.step.map((item) => {
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

  setItem("todoItem", todoRes)
}

export function modifyStepServer(todoId, stepId, value) {
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
}
