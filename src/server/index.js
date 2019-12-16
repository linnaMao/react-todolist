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
  // 把所有表都获取到
  const allTitle = getItem("Title")
  let allTodo = getItem("Todo")
  let allStep = getItem("Step")
  const allTitleTodo = getItem("TitleTodo")

  // 删除title
  const filteredTitle = allTitle.filter(i => i.id !== titleId)
  // title删除完毕

  // 删除TitleTodo
  const filteredTitleTodo = allTitleTodo.filter(i => i.titleId === titleId)
  // TitleTodo删除完毕

  // 删除todo（遍历的时候要根据todoId把对应的step也删了）
  // 根据titleId获取所有的对应todoId（注意.filter后面还有个.map）
  const todoIdList = allTitleTodo.filter(i => i.titleId === titleId).map(i => i.todoId)
  // 用获取到的todoIdList遍历进行删除（一个一个删除）
  todoIdList.forEach(id => {
    // 这里的id是todoId
    // 根据todoId删除todo
    allTodo = allTodo.filter(i => i.id !== id)
    // 此时要根据todoId删除step
    allStep = allStep.filter(i => i.todoId !== id)
  })
  // todo和step删除完毕

  // 把表进行更新
  setItem('Title', filteredTitle)
  setItem('TitleTodo', filteredTitleTodo)
  setItem('Todo', allTodo)
  setItem('Step', allStep)

  // let todoIds = []
  // let titleTodoRes, todoRes, stepRes
  // allTitleTodo.map(item => {
  //   if (item.titleId === titleId) {
  //     todoIds.push(item.todoId)
  //   }
  //   return todoIds
  // })
  // if (todoIds.length === 1) {
  //   titleTodoRes = allTitleTodo.filter(i => i.titleId !== titleId)
  //   todoRes = allTodo.filter(i => i.id !== todoIds[0])
  //   stepRes = allStep.filter(i => i.todoId !== todoIds[0])
  // } else if (todoIds.length === 2) {
  //   titleTodoRes = allTitleTodo.filter(i => !(i.titleId === titleId || i.todoId === todoIds[0] || i.todoId === todoIds[1]))
  //   todoRes = allTodo.filter(i => !(i.id === todoIds[0] || i.id === todoIds[1]))
  //   stepRes = allStep.filter(i => !(i.todoId === todoIds[0] || i.todoId === todoIds[1]))
  // } else if (todoIds.length === 3) {
  //   titleTodoRes = allTitleTodo.filter(i => !(i.titleId === titleId || i.todoId === todoIds[0] || i.todoId === todoIds[1]) || i.todoId === todoIds[2])
  //   todoRes = allTodo.filter(i => !(i.id === todoIds[0] || i.id === todoIds[1] || i.id === todoIds[2]))
  //   stepRes = allStep.filter(i => !(i.todoId === todoIds[0] || i.todoId === todoIds[1] || i.todoId === todoIds[2]))
  // }
  // // 删除title
  // const titleRes = allTitle.filter(i => i.id !== titleId)
  // setItem("Title", titleRes)
  // setItem("Todo", todoRes)
  // setItem("Step", stepRes)
  // setItem("TitleTodo", titleTodoRes)
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
  // const stepRes = myDay.map(item => {
  //   return allStep.find(i => i.todoId === item.id)
  // })
  // 过期的联系
  pastDay.forEach(past => {
    const pastRelation = allTitleTodo.filter(item => item.todoId !== past.id)
    allTitleTodo = pastRelation
  })

  setItem("Todo", myDay)
  setItem('TitleTodo', allTitleTodo)
  // setItem("Step", stepRes)
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
