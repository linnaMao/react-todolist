import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';
import TodoItem from './TodoItem'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  getTodoItem() {
    const { todoList } = this.props;
    return (
      todoList.map((item, index) => (
        <TodoItem 
          key={item+index}
          content={item}
          index={index}
        />
      ))
    )
  }

  render() {
    return (
      <div className={styled.content}>
        <ul className={styled.todoList}>
          {this.getTodoItem()}
        </ul>
      </div>
    )
  }
}

export default Home