import Title from '../db/Entity/Title'
import Todo from '../db/Entity/Todo'
import TitleTodo from '../db/Entity/TitleTodo'
import Step from '../db/Entity/Step'
import moment from "moment";

function getItem(name) {
  const json = localStorage.getItem(name) 
  return JSON.parse(json)
}

function setItem(name, item) {
  const newJson = JSON.stringify(item)
  localStorage.setItem(name, newJson)
}

// value: todo的值
// titleId
export function insertTodoServer(value, titleId, isStar, isAddToMyDay) {
  // 获取所有的表
  const allTitle = getItem("Title")
  const allTitleTodo = getItem("TitleTodo")
  const allTodo = getItem("Todo")

  // 构造todo
  const todo = new Todo(value, isStar, isAddToMyDay)
  // 找到新的todo对应的title实体
  const titleRes = allTitle.find(i=>i.id===titleId)
  // 构造两者的联系
  const titleTodoRelation = new TitleTodo(titleRes.id, todo.id)

  // 更新数据表
  allTodo.push(todo)
  allTitleTodo.push(titleTodoRelation)

  // 同步表
  setItem('Todo', allTodo)
  setItem('TitleTodo', allTitleTodo)
} 

export function getListByTypeServer(id) {
  const allTodo = getItem("Todo")
  const allTitleTodo = getItem("TitleTodo")
  const allStep = getItem("Step")
  // 遍历出title对应的todo的id
  const todoIds = allTitleTodo.filter(i => i.titleId === id)
  const todoRes = todoIds.map((item) => {
    const step = allStep.filter(i => i.todoId === item.todoId)
    return {
      ...allTodo.find(i => i.id === item.todoId),
      step
    }
  })
  return todoRes
}

export function finishedServer(id) {
  const allTodo = getItem("Todo")
  const res = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isFinish: !item.isFinish
      }
    }
    return {...item}
  })
  setItem("Todo", res)
}

export function starServer(id) {
  const allTodo = getItem("Todo")
  const allTitle = getItem("Title")
  const allTitleTodo = getItem("TitleTodo")

  // 找出是否存在当前todo
  const existTitleTodo = allTitleTodo.find(i => i.titleId === allTitle[1].id && i.todoId === id)

  // 设置星星
  const todoRes = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isStar: !item.isStar
      }
    }
    return {...item}
  })
  if (!existTitleTodo) {
    // 设为重要
    // 获取title为重要的id和当前点击的todoId
    const titleTodoRelation = new TitleTodo(allTitle[1].id, id)
    allTitleTodo.push(titleTodoRelation)
    setItem("TitleTodo", allTitleTodo)
  } else {
    // 取消重要
    const titleTodoRelation = allTitleTodo.filter(i => !(i.titleId === allTitle[1].id && i.todoId === id))
    setItem("TitleTodo", titleTodoRelation)
  }

  setItem("Todo", todoRes)
}

export function deleteItemServer(id) {
  const allTodo = getItem("Todo")
  const allStep = getItem("Step")
  const allTitleTodo = getItem("TitleTodo")
  // 删除todo和step
  const todoRes = allTodo.filter(i => i.id !== id)
  const stepRes = allStep.filter(i => i.todoId !== id)
  // 删除联系
  const titleTodoRes = allTitleTodo.filter(i => i.todoId !== id)
  setItem("Todo", todoRes)
  setItem("Step", stepRes)
  setItem("TitleTodo", titleTodoRes)
}

export function addMyDayServer(id) {
  const allTodo = getItem("Todo")
  const allTitle = getItem("Title")
  const allTitleTodo = getItem("TitleTodo")

  const titleTodo = new TitleTodo(allTitle[0].id, id)
  allTitleTodo.push(titleTodo)

  const todoRes = allTodo.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isAddMyDay: true
      }
    }
    return {...item}
  })
  setItem("Todo", todoRes)
  setItem("TitleTodo", allTitleTodo)
}

export function addRemarkServer(id, value) {
  const allTodo = getItem("Todo")
  const res = allTodo.map((item) => {
    if(item.id === id) {
      return {
        ...item,
        remark: value,
        remarkTime: new Date().getTime()
      }
    }
    return {...item}
  })
  setItem("Todo", res)
}

export function addStepServer(id, value) {
  const allStep = getItem("Step")
  const step = new Step(id, value)
  allStep.push(step)
  setItem("Step", allStep)
}

export function deleteStepServer(stepId) {
  const allStep = getItem("Step")
  const stepRes = allStep.filter(i => i.id !== stepId)
  setItem("Step", stepRes)
}

export function stepFinishServer(stepId) {
  const allStep = getItem("Step")
  const stepRes = allStep.map((item) => {
    if (item.id === stepId) {
      return {
        ...item,
        isFinish: !item.isFinish
      }
    }
    return {...item}
  })
  setItem("Step", stepRes)
}

export function modifyStepServer(stepId, value) {
  const allStep = getItem("Step")
  const stepRes = allStep.map((item) => {
    if (item.id === stepId) {
      return {
        ...item,
        title: value
      }
    }
    return {...item}
  })
  setItem("Step", stepRes)
}

export function modifyTitleServer(todoId, value) {
  const allTodo = getItem("Todo")
  const res = allTodo.map((item) => {
    if (item.id === todoId) {
      return {
        ...item,
        listName: value
      }
    }
    return {...item}
  })
  setItem("Todo", res)
}

export function getTitleListServer() {
  const allTitle = getItem("Title")
  return allTitle
}

export function insertTitleServer(titleValue) {
  const allTitle = getItem("Title")
  const title = new Title(titleValue)
  allTitle.push(title)
  setItem("Title", allTitle)

}

export function deleteTitleSever(titleId) {
  // 删除标题列表的时候 要将其他三个表内有关东西删除
  const allTitle = getItem("Title")
  const allTodo = getItem("Todo")
  const allStep = getItem("Step")
  const allTitleTodo = getItem("TitleTodo")

  const res = allTitle.filter(i => i.id !== titleId)
  setItem("Title", res)
}

export function clearMyDayServer() {
  // 现在的时间
  const nowTime = new Date().getTime()

  // 获取表
  const allTodo = getItem("Todo")
  let allTitleTodo = getItem("TitleTodo")
  // 我的一天中同时又是过期的
  const pastDay = allTodo.filter(i => {
    return moment(i.createTime).isBefore(nowTime, 'day') && i.isAddMyDay
  })

  // 过滤之后的所有数据
  const myDay = allTodo.filter(i => !(moment(i.createTime).isBefore(nowTime, 'day') && i.isAddMyDay))

  // 过期的联系
  pastDay.forEach(past => {
    const pastRelation = allTitleTodo.filter(item => item.todoId !== past.id)
    allTitleTodo = pastRelation
  })

  setItem("Todo", myDay)
  setItem('TitleTodo', allTitleTodo)
}

export function modifyListTitleServer(titleId, value) {
  const allTitle = getItem("Title")
  const titleRes = allTitle.map(item => {
    if (item.id === titleId) {
      return {
        ...item,
        titleName: value
      }
    }
    return {...item}
  })
  setItem("Title", titleRes)
}
