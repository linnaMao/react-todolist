import React from 'react';
import IconFont from '../IconFont';
import styled from './index.scss';
import Todo from '../../db1/Entity/Todo';

import { insertTodo } from '../../axios1'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleEnterAdd = (e) => {
    const { value } = this.state
    const { currentType, getTodoListByType } = this.props
    if (e.nativeEvent.keyCode === 13 && value !== "") {
      // 请求存储todo
      const todo = new Todo(value, currentType)
      insertTodo(todo)
      this.setState({
        value: ""
      })
      // 更新页面
      getTodoListByType(currentType)
    }
  }



  render() {
    const { value } = this.state
    return (
      <div className={styled.itemFooter}>
        <IconFont type="icon-hao" />
        <input 
          type="text" 
          placeholder="添加任务"
          value={value}
          onChange={this.handleChange}
          onKeyPress={this.handleEnterAdd}
          />
      </div>
    )
  }
}

export default Footer