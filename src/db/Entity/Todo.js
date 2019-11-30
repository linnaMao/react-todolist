export default class Todo {
  constructor(listName, title) {
    this.listName = listName
    this.id = "todo" + new Date().getTime()
    this.createTime = new Date().getTime()
    this.remarkTime = new Date().getTime()
    this.isFinish = false
    this.isStar = false
    this.remark = ''
    this.step = []
    this.title = title
  }
}

