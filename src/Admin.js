import React from 'react';
import { Row, Col, message } from 'antd';
import NavLeft from './components/NavLeft';
import NavRight from './components/NavRight';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

import styled from './Admin.scss';
import { getListByType, deleteItem, deleteTitle, getTitleList, clearMyDay } from './axios';

// 初始化的checkTitle
const initialCheckedTitle = JSON.parse(localStorage.getItem('Title'))[0]
class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedTitle: initialCheckedTitle,
      todoList: [],  // 中间的todos
      navList: [], // 左侧title
      checkedTodo: null, // 选中右边的todo
      isShow: false,
      hideTitle: false
    }
  }

  componentDidMount() {
    clearMyDay()
    const { checkedTitle } = this.state
    const lists = getListByType(checkedTitle.id)
    this.setState({
      todoList: lists
    })
  }

  componentDidUpdate() {
    const num= (1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length) / (1024);
    console.log("当前localStorage容量还剩" + num.toFixed(2) +"KB");
  }

  renderTodoItem() {
    const { todoList, checkedTitle, hideTitle } = this.state;
    return (
      todoList.map((item) => {
        const todoItem = 
          <TodoItem
            checkedTitle={checkedTitle}
            key={item.id}
            content={item}
            handleClick={this.handleTodoClick}
            handleDeleteItem={this.handleDeleteItem}
            getTodoListByTitle={this.getTodoListByTitle}
          />
        if (!hideTitle) {
          return todoItem
        } else if (hideTitle && !item.isFinish) {
          return todoItem
        }
        return null
      })
    )
  }

  // 点击左栏title
  handleTitleClick = (item) => {
    this.setState({
      checkedTitle: item,
      isShow: false
    })
    // 根据title获取todolist
    this.getTodoListByTitle(item.id)
  }

  // 根据title的id获取todolist
  getTodoListByTitle = (id) => {
    const { checkedTodo } = this.state
    const lists =  getListByType(id)
    this.setState({
      todoList: lists,
      checkedTodo: checkedTodo && lists.find(i => i.id === checkedTodo.id)
    })
    if(checkedTodo && checkedTodo.id === id) {
      this.setState((preState) => ({
        isShow: !preState.isShow
      }))
    }
  }

  // 右栏显示
  handleTodoClick = (todo) => {
    const { checkedTodo, isShow } = this.state
    let todoId = todo.id
    this.setState({
      checkedTodo: todo,
      isShow: true
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
  handleDeleteItem = (content) => {
    const { checkedTodo } = this.state
    this.setState({
      isShow: false
    })
    content ? deleteItem(content.id) : deleteItem(checkedTodo.id)
  }

  // 获取title
  getTitle = () => {
     this.setState({
      navList: getTitleList()
    }, () => this.updateCheckedTitle())
  }

  // 更新最新的checkedTitle
  updateCheckedTitle = () => {
    const { navList, checkedTitle } = this.state
    const newTitle = navList.find(i => i.id === checkedTitle.id)
    this.setState({
      checkedTitle: newTitle
    })
  }

  // 删除左侧标题
  handleDeleteTitle = () => {
    const { checkedTitle } = this.state
    if (checkedTitle.icon === "icon-hanbao") {
      deleteTitle(checkedTitle.id)
      this.setState({
        checkedTitle: initialCheckedTitle,
        isShow: false
      }, () => {
        this.getTitle()
        this.getTodoListByTitle(initialCheckedTitle.id)
      })
    } else {
      message.error("默认清单不能删除~")
    }
  }

  render() {
    const { checkedTitle, checkedTodo, isShow, hideTitle, navList } = this.state
    return (
      <div>
        <Row type="flex" className={styled.container}>
          <Col 
            xs={{ span: 0 }}
            lg={{ span: 4 }} 
            className={styled.navLeft}>
            <NavLeft 
              handleTitleClick={this.handleTitleClick}
              getTitle={this.getTitle}
              navList={navList}
            />
          </Col>
          <Col 
            xs={{ span: isShow?0:24 }}
            lg={{ span: isShow?15:20 }} 
            className={styled.main}
            >
            <Header 
              checkedTitle={checkedTitle}
              hideTitle={hideTitle}
              handleHideClick={this.handleHideClick}
              handleDeleteTitle={this.handleDeleteTitle}
              getTodoListByTitle={this.getTodoListByTitle}
              getTitle={this.getTitle}
              navList={navList}
            />
            <Row className={styled.content}>
              {this.renderTodoItem()}
            </Row>
            <Footer
              checkedTitle={checkedTitle}
              getTodoListByTitle={this.getTodoListByTitle}
            />
          </Col>
          <Col 
            xs={{ span: isShow?24:0 }}
            lg={{ span: isShow?5:0 }}
            className={styled.navRight} 
            style={ isShow ? {display: 'block'} : {display: 'none'}}
          >
            {checkedTodo && <NavRight 
              checkedTodo={checkedTodo}
              getTodoListByTitle={this.getTodoListByTitle}
              checkedTitle={checkedTitle}
              handleDeleteItem = {this.handleDeleteItem}
            />}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin