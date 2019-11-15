// 初始化数据库
function initDataBase() {
  const todoItem = localStorage.getItem("todoItem");
  const stepItem = localStorage.getItem("stepItem");
  if (!todoItem) {
    localStorage.setItem("todoItem", JSON.stringify([]))
  }

  if (!stepItem) {
    localStorage.setItem("stepItem", JSON.stringify([]))
  }
}

initDataBase()