import React from 'react';
import styled from './index.scss';
import TodoItem from './components/TodoItem'

class Home extends React.Component {

  getTodoItem() {
    const { todoList, handleTodoClick, currentTodoType, getTodoListByTitle } = this.props;
    return (
      todoList.map((item, index) => (
        <TodoItem
          currentTodoType={currentTodoType}
          key={item.id}
          content={item}
          handleClick={handleTodoClick}
          getTodoListByTitle={getTodoListByTitle}
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