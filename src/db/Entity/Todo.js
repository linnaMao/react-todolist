export default class Todo {
  constructor(listName, isStar, isAddMyDay) {
    this.listName = listName
    this.id = "todo" + new Date().getTime()
    this.createTime = new Date().getTime()
    this.remarkTime = new Date().getTime()
    this.isAddMyDay = !!isAddMyDay
    this.isFinish = false
    this.isStar = !!isStar 
    this.remark = ''
  }
}

