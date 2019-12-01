export default class Title{
  constructor(titleName) {
    this.id = "title" + new Date().getTime()
    this.titleName =  titleName
    this.createTime = new Date().getTime
    this.icon = 'icon-hanbao'
  }
}