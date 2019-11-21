import React from 'react';
import NavLeft from './components/NavLeft';
import Home from './components/Home';
import Header from './components/Header'
import Footer from './components/Footer';
import styled from './Admin.scss';
import { Col, Row } from 'antd';

import { getListByType } from './axios1'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [], //所有的todo
      checkedTodo:null, //右栏todo
      homeTitle: "我的一天" //title
    }
  }

  componentDidMount() {
    const { homeTitle } = this.state
    const lists = getListByType(homeTitle)
    console.log(lists)
    this.setState({
      todoList: lists
    })
  }

  // 获取左栏title
  handleLeftTitle = (title) => {
    this.setState({
      homeTitle: title
    })
    this.getTodoListByType(title)
  }

  // 获取相应页面的todo
  getTodoListByType = (title) => {
    const { checkedTodo } = this.state
    const lists = getListByType(title)
    this.setState({
      todoList: lists,
      checkedTodo: checkedTodo && lists.find(i => i.id === checkedTodo.id)
    })
  }

  // 获取右栏todo
  handleRightTodo = (todo) => {
    this.setState({
      checkedTodo: todo
    })
  }

  render() {
    const { todoList, homeTitle, checkedTodo } = this.state
    return (
      <div>
        <Row>
          <Col span={4} className={styled.navLeft}>
            <NavLeft 
              handleLeftTitle={this.handleLeftTitle}
            />
          </Col>
          <Col span={20} className={styled.home} className={styled.container}>
            <Header homeTitle={homeTitle} />
            <Row>
              <Home 
                todoList={todoList}
                currentType={homeTitle}
                getTodoListByType={this.getTodoListByType}
                handleRightTodo={this.handleRightTodo}
                checkedTodo={checkedTodo}
              />
            </Row>
            <Footer 
              currentType={homeTitle}
              getTodoListByType={this.getTodoListByType}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin