import React from 'react';
import styled from './index.scss';
import TodoItem from './components/TodoItem';
import NavRight from './components/NavRight'
import { Drawer } from 'antd';

class Home extends React.Component {

  state = { visible: false, rightTitle: "" };
  
  getTodoItem = () => {
    const { todoList, currentType, getTodoListByType } = this.props
    return todoList.map((item, index) => (
      <TodoItem 
        key={index}
        content={item}
        showDrawer={this.showDrawer}
        currentType={currentType}
        getTodoListByType={getTodoListByType}
      />
    ))
  }

  showDrawer = (title) => {
    this.setState({
      visible: true,
      rightTitle: title
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { rightTitle } = this.state
    return (
      <div>
        <div className={styled.homeList}>
          {this.getTodoItem()}
        </div>
        <div>
          <Drawer
            title={rightTitle}
            width={300}
            placement="right"
            closable={false}
            onClose={this.closeDrawer}
            visible={this.state.visible}
            bodyStyle={{
              background: '#f1eef0',
              height: 'calc(100vh)',
              padding: '0px'
              }}
            className={styled.drawer}
          >
            <NavRight />
          </Drawer>
      </div>
      </div>
    )
  }
}

export default Home