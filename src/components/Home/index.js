import React from 'react';
import styled from './index.scss';
import TodoItem from './components/TodoItem';


class Home extends React.Component {
  getTodoItem = () => {
    const { todoList } = this.props
    return todoList.map((item) => (
      <TodoItem 
        content={item}
      />
    ))
  }

  render() {
    return (
      <div>
        <div className={styled.homeList}>
          {this.getTodoItem()}
        </div>
      </div>
    )
  }
}

export default Home