import React from 'react';
import { Row, Col } from 'antd';
import Moment from './components/Moment';
import NavLeft from './components/NavLeft';
import NavRight from './components/NavRight';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem'

import styled from './Admin.scss';
import { getListByType, deleteItem } from './axios';

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeHeadTitle: '我的一天',
      todoList: [],  // 中间的todos
      checkedTodo: null, // 选中右边的todo
      isShow: false,
      hideTitle: false,
      createTime: ""
    }
  }

  getTodoItem() {
    const { todoList, homeHeadTitle, hideTitle } = this.state;
    return (
      todoList.map((item) => {
        const todoItem = 
          <TodoItem
          currentTodoType={homeHeadTitle}
          key={item.id}
          content={item}
          handleClick={this.handleTodoClick}
          getTodoListByTitle={this.getTodoListByTitle}
        />
        if (!hideTitle) {
          return todoItem
        } else if (hideTitle && !item.isFinish) {
          return todoItem
        }
      })
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
    const { checkedTodo, hideTitle } = this.state
    const lists =  getListByType(title, hideTitle)
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
    let createTime = Moment.formateDate(todo.createTime)
    this.setState({
      checkedTodo: todo,
      isShow: true,
      createTime
    }, () =>{
      if (checkedTodo !== null && checkedTodo !== undefined) {
        (checkedTodo.id === todoId) && this.setState({
          isShow: !isShow
        })
      }
    })
    
  }

  // 点击隐藏已完成列表
  handleHideClick = () => {
    this.setState((preState) => ({
      hideTitle: !preState.hideTitle
    }))
  }

  // 删除右列todo
  handleDeleteItem = () => {
    const { checkedTodo } = this.state
    deleteItem(checkedTodo.id)
  }

  render() {
    const { homeHeadTitle, checkedTodo, isShow, hideTitle, createTime } = this.state
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
            <Header 
              title={homeHeadTitle}
              hideTitle={hideTitle}
              handleHideClick={this.handleHideClick}
            />
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
              createTime={createTime}
              handleDeleteItem = {this.handleDeleteItem}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin