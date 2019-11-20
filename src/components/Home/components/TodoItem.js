import React from 'react';
import IconFont from '../../IconFont';
import styled from '../index.scss';

import { finished, star } from '../../../axios1';

class TodoItem extends React.Component {
  
  showDrawer = (title) => {
    const { showDrawer } = this.props
    showDrawer(title)
  }

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

  render() {
    const { content } = this.props
    return (
      <div className={styled.homeListItem}>
        <IconFont 
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"} 
          className={styled.itemFinish} 
          onClick={this.handleFinishClick}  
        />
        <div className={styled.item} onClick={() => this.showDrawer(content.title)}>{content.title}</div>
        <IconFont 
          type={content.isStar?"icon-start":"icon-kongxinxingxing-copy"} 
          className={styled.itemStar} 
          onClick={this.handleStarClick}
        />
      </div>
    )
  }
}

export default TodoItem