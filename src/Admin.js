import React from 'react';
import NavLeft from './components/NavLeft';
import TodoItem from './components/TodoItem';
import DrawerContent from './components/DrawerContent';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from './Admin.scss';
import { Col, Row, Drawer } from 'antd';

import { getListByType } from './axios1'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [], //所有的todo
      checkedTodo:null, //右栏todo
      homeTitle: "我的一天", //title
      visible: false,
      rightTitle: ""
    }
  }

  componentDidMount() {
    const { homeTitle } = this.state
    const lists = getListByType(homeTitle)
    this.setState({
      todoList: lists
    })
  }

  // 获取todo
  getTodoItem = () => {
    const { todoList, homeTitle } = this.state
    return todoList.map((item, index) => (
      <TodoItem 
        key={index}
        content={item}
        handleRightShow={this.handleRightShow}
        handleRightTodo={this.handleRightTodo}
        getTodoListByType={this.getTodoListByType}
        currentType={homeTitle}
      />
    ))
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

  // 右栏关闭
  handleRightClose = () => {
    this.setState({
      visible: false
    });
  };

  // 获取点击item以及右栏开启
  handleRightShow = (content) => {
    this.setState({
      visible: true,
      rightTitle: content.title,
      checkedTodo: content
    })
  }

  render() {
    const { homeTitle, checkedTodo, rightTitle } = this.state
    return (
      <div>
        <Row>
          <Col span={4} className={styled.navLeft}>
            <NavLeft 
              handleLeftTitle={this.handleLeftTitle}
            />
          </Col>
          <Col span={20} className={styled.container}>
            <Header homeTitle={homeTitle} />
            <Row>
              {this.getTodoItem()}
              <Drawer
                title={rightTitle}
                placement="right"
                closable={false}
                onClose={this.handleRightClose}
                visible={this.state.visible}
                bodyStyle={{
                  padding: "0px",
                  backgroundColor: "#eaeaea",
                  height: "calc(100vh)"
                }}
              >
                <DrawerContent 
                  checkedTodo={checkedTodo}
                  getTodoListByType={this.getTodoListByType}
                  currentType={homeTitle}
                />
              </Drawer>
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