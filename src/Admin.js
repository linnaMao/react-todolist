import React from 'react';
import NavLeft from './components/NavLeft';
import Home from './components/Home';
import Header from './components/Header'
import Footer from './components/Footer';
import styled from './Admin.scss';
import { Col, Row } from 'antd';



class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [{
        id: new Date().getTime(),
        title: "123",
        createTime: new Date().getTime(),
        isFinish: false,
        isStar: false,
        isAddToMyDay: false,
        remark: "123", //字符串
        step: [], //数组
        type: "我的一天"
      }]
    }
  }
  render() {
    const { todoList } = this.state
    return (
      <div>
        <Row>
          <Col span={4} className={styled.navLeft}>
            <NavLeft />
          </Col>
          <Col span={20} className={styled.home} className={styled.container}>
            <Header />
            <Row>
              <Home 
                todoList={todoList}
              />
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin