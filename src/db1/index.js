// 初始化数据库

function initDataBase() {
  const todoItem = localStorage.getItem("todoItem");
  if (!todoItem) {
    localStorage.setItem("todoItem", JSON.stringify([]))
  }
}

initDataBase();