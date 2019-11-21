import React from 'react';
import styled from './index.scss';
import TodoItem from './components/TodoItem';

class Home extends React.Component {
  
  getTodoItem = () => {
    const { todoList, currentType, getTodoListByType, handleRightTodo, checkedTodo } = this.props
    return todoList.map((item, index) => (
      <TodoItem 
        key={index}
        content={item}
        showDrawer={this.showDrawer}
        currentType={currentType}
        getTodoListByType={getTodoListByType}
        handleRightTodo={handleRightTodo}
        checkedTodo={checkedTodo}
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