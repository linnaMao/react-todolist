export default class Step {
  constructor(todoId, title) {
    this.title = title
    this.id = "step" + new Date().getTime()
    this.todoId = todoId
    this.createTime = new Date().getTime()
    this.isFinish = false
  }
}