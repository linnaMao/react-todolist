const tableNames = [
  {
    name: 'Todo',
  },
  {
    name: 'Step'
  },
  {
    name: 'Title',
    initialData: [
      {
        id: 'title' + new Date().getTime() + 0,
        titleName: '我的一天',
        createTime: new Date().getTime(),
        icon: 'icon-taiyang',
        todo: []
      },
      {
        id: 'title' + new Date().getTime() + 1,
        titleName: '重要',
        createTime: new Date().getTime(),
        icon: 'icon-star',
        todo: []
      },
      {
        id: 'title' + new Date().getTime() + 2,
        titleName: '任务',
        createTime: new Date().getTime(),
        icon: 'icon-renwu',
        todo: []
      }
    ]
  },
  {
    name: 'TitleTodo'
  }
]
tableNames.forEach((item) => {
  const itemName = localStorage.getItem(item.name);
  if (!itemName) {
    localStorage.setItem(item.name, JSON.stringify(item.initialData?item.initialData:[]))
  }
})


// // 初始化数据库
// function initDataBase() {
//   const todoItem = localStorage.getItem("todoItem");
//   const stepItem = localStorage.getItem("stepItem");
//   if (!todoItem) {
//     localStorage.setItem("todoItem", JSON.stringify([]))
//   }

//   if (!stepItem) {
//     localStorage.setItem("stepItem", JSON.stringify([]))
//   }
// }

// initDataBase()