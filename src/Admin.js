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
      checkTodo:null, //每个title的不同todo
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
    const { checkTodo } = this.state
    const lists = getListByType(title)
    this.setState({
      todoList: lists,
      checkTodo: checkTodo && lists.find(i => i.id === checkTodo.id)
    })
  }

  render() {
    const { todoList, homeTitle } = this.state
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