// todo
export const todo = {
  id: String,
  listName: String, //字符串
  createTime: Number, //数字(时间戳)
  isFinish: Boolean, //布尔值
  isStar: Boolean, //布尔值
  isAddToMyDay: Boolean,
  remark: String, //字符串
  step: Array, //数组
  title: Array
}

// todo step

export const todoStep = {
  id: String,
  todoId: String,
  title: String,
  createTime: Number,
  isFinish: Boolean,
}

// title

export const title = {
  id: String,
  titleName: String,
  createTime: Number,
  todo: Array
}

export const titleTodo = {
  titleId: String,
  todoId: String,
}