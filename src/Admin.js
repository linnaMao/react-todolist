import React from 'react';
import { Row, Col } from 'antd';
import styled from './style/common.scss';
import NavLeft from './components/navLeft';
import NavRight from './components/navRight';
import Header from './components/header'
import Footer from './components/footer'
import Home from './page/Home';
import 'antd/dist/antd.css';

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList:[],
      value: ''
    }
  }

  // componentDidMount() {
  //   // 相等于调接口
  //   this.getList()
  // }

  // getList = () => {
  //   // 新增时首先获取已有的，如果没有，那就是个空数组
  //   const lists = localStorage.getItem('todolist') || '[]';

  //   localStorage.setItem("value", "")
  //   const value = localStorage.getItem("value")
    
  //   // 转成json
  //   const jsonList = JSON.parse(lists)

  //   this.setState({
  //     todoList: jsonList,
  //     value
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      value:e.target.value
    })
  }

  handlePress = (e) => {
    const { todoList } = this.state
    const { value } = this.state
    if (e.nativeEvent.keyCode === 13 && value!=="") {
      this.setState({
        todoList: [...todoList, value],
        value: ''
      })
      console.log(todoList)
    }
  }

  render() {
    const { todoList, value } = this.state
    return (
      <div>
        <Row type="flex" className={styled.container}>
          <Col span={4} className={styled.navLeft}>
            <NavLeft />
          </Col>
          <Col span={15} className={styled.main}>
            <Header />
            <Row className={styled.content}>
              <Home value={value} todoList={todoList} />
            </Row>
            <Footer 
              value={value} 
              todoList={todoList} 
              handleChange = {this.handleChange}
              handlePress = {this.handlePress}
              />
          </Col>
          <Col span={5} className={styled.navRight}>
            <NavRight />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin