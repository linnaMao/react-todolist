import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from './components/NavLeft';
import NavRight from './components/NavRight';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem'

import styled from './Admin.scss';
import { getListByType } from './axios';

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeHeadTitle: '我的一天',
      todoList: [],  // 中间的todos
      checkedTodo: null, // 选中右边的todo
      isShow: false
    }
  }

  getTodoItem() {
    const { todoList, homeHeadTitle } = this.state;
    return (
      todoList.map((item, index) => (
        <TodoItem
          currentTodoType={homeHeadTitle}
          key={item.id}
          content={item}
          handleClick={this.handleTodoClick}
          getTodoListByTitle={this.getTodoListByTitle}
        />
      ))
    )
  }

  componentDidMount() {
    const { homeHeadTitle } = this.state
    const lists = getListByType(homeHeadTitle)
    this.setState({
      todoList: lists
    })
  }

  // 点击左栏title
  handleTitleClick = (title) => {
    this.setState({
      homeHeadTitle: title,
      isShow: false
    })
    // 根据title获取todolist
    this.getTodoListByTitle(title)
  }

  // 根据title获取todolist
  getTodoListByTitle = (title, id) => {
    const { checkedTodo } = this.state
    const lists =  getListByType(title)
    this.setState({
      todoList: lists,
      checkedTodo: checkedTodo && lists.find(i => i.id === checkedTodo.id)
    })
    if(checkedTodo && checkedTodo.id === id) {
      this.setState((preState) => ({
        isShow: !preState.isShow
      }))
    }
    if(window.localStorage) {
      var num= (1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length) / (1024);
      console.log("当前localStorage容量还剩" + num.toFixed(2) +"KB");
    }
  }

  // 右栏显示
  handleTodoClick = (todo) => {
    const { checkedTodo, isShow } = this.state
    let todoId = todo.id
    this.setState({
      checkedTodo: todo,
      isShow: true
    })
    if (checkedTodo !== null) {
      (checkedTodo.id === todoId) && this.setState({
        isShow: !isShow
      })
    }
  }

  render() {
    const { homeHeadTitle, checkedTodo, isShow } = this.state
    return (
      <div>
        <Row type="flex" className={styled.container}>
          <Col span={4} className={styled.navLeft}>
            <NavLeft 
              handleTitleClick={this.handleTitleClick}
            />
          </Col>
          <Col 
            span={isShow?15:20} 
            className={styled.main}
            >
            <Header title={homeHeadTitle} />
            <Row className={styled.content}>
              {this.getTodoItem()}
            </Row>
            <Footer
              currentTodoType={homeHeadTitle}
              getTodoListByTitle={this.getTodoListByTitle}
            />
          </Col>
          <Col span={isShow?5:0} className={styled.navRight} style={ isShow ? {display: 'block'} : {display: 'none'}}>
            <NavRight 
              checkedTodo={checkedTodo}
              getTodoListByTitle={this.getTodoListByTitle}
              currentTodoType={homeHeadTitle}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin