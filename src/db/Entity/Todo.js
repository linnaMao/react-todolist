export default class Todo {
  constructor(title, type) {
    this.title = title
    this.id = new Date().getTime()
    this.createTime = new Date().getTime()
    this.remarkTime = new Date().getTime()
    this.isFinish = false
    this.isStar = false
    this.remark = ''
    this.step = []
    this.type = type
  }
}

