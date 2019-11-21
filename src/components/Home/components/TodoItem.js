import React from 'react';
import IconFont from '../../IconFont';
import styled from '../index.scss';
import NavRight from './NavRight'
import { Drawer } from 'antd';

import { finished, star } from '../../../axios1';

class TodoItem extends React.Component {
  
  state = { visible: false};

  // 设置finish的完成
  handleFinishClick = () => {
    const { content, currentType, getTodoListByType } = this.props
    // 设置finish
    finished(content.id)
    // 更新页面
    getTodoListByType(currentType)
  }

  // 设置star
  handleStarClick = () => {
    const { content, currentType, getTodoListByType } = this.props
    // 设置finish
    star(content.id)
    // 更新页面
    getTodoListByType(currentType)
  }

  showDrawer = () => {
    const { handleRightTodo, content } = this.props
    handleRightTodo(content)
    this.setState({
      visible: true
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { content, checkedTodo, getTodoListByType, currentType } = this.props
    return (
      <div className={styled.homeListItem}>
        <IconFont 
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"} 
          className={styled.itemFinish} 
          onClick={this.handleFinishClick}  
        />
        <div className={styled.item} onClick={() => this.showDrawer()}>{content.title}</div>
        <IconFont 
          type={content.isStar?"icon-start":"icon-kongxinxingxing-copy"} 
          className={styled.itemStar} 
          onClick={this.handleStarClick}
        />
        <Drawer
            title={content.title}
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
          >
            <NavRight  
              checkedTodo={checkedTodo} 
              getTodoListByType={getTodoListByType}
              currentType={currentType}
              />
          </Drawer>
      </div>
    )
  }
}

export default TodoItem