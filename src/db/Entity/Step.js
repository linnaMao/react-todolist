export default class Step {
  constructor(id, title) {
    this.title = title
    this.id = new Date().getTime()
    this.todoId = id
    this.createTime = new Date().getTime()
    this.isFinish = false
  }
}