// todo
export const todo = {
  id: String,
  title: String, //字符串
  createTime: Number, //数字(时间戳)
  isFinish: Boolean, //布尔值
  isStar: Boolean, //布尔值
  isAddToMyDay: Boolean,
  remark: String, //字符串
  step: Array, //数组
  type: String
}

// todo step

export const todoStep = {
  id: String,
  title: String,
  createTime: Number,
  isFinish: Boolean,
}