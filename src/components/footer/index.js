import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';

import Todo from '../../db/Entity/Todo';
import { insertTodo } from '../../axios';

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
   this.setState({
     value: e.target.value
   })
  }

  handleEnterKey = (e) => {
    const { value } = this.state
    const { getTodoListByTitle, currentTodoType } = this.props

    if (e.nativeEvent.keyCode === 13 && value !== "") {
      // 发起请求存todo
      const todo = new Todo(value, currentTodoType)
      insertTodo(todo)
      this.setState({
        value: ''
      })
      // 更新页面
      getTodoListByTitle(currentTodoType)
    }
    
  }

  render() {
    const { value } = this.state
    return (
      <div className={styled.footer}>
        <Icon type="plus" />
        <input 
          value={value}
          className={styled.add}  
          placeholder="添加任务" 
          onChange={this.handleChange} 
          onKeyPress={this.handleEnterKey} 
        />
      </div>
    )
  }
}

export default Footer