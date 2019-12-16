import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';
import { IconFont } from '../Iconfont';

import { finished, star }  from '../../axios'

class TodoItem extends React.Component {

  // 点击完成
  handleFinishClick = () => {
    const { content, getTodoListByTitle, checkedTitle } = this.props
    // 调接口设置
    finished(content.id)
    // 刷新一下
    getTodoListByTitle(checkedTitle.id)
  }

  // 右栏显示
  handleClick = () => {
    const { handleClick, content } = this.props
    // 右栏显示
    handleClick(content)
  }

  handleStarClick = () => {
    const { content, getTodoListByTitle, checkedTitle } = this.props
    // 调接口设置
    star(content.id)
    // 刷新一下
    getTodoListByTitle(checkedTitle.id)
  }

  handleDelete = () =>{
    const { content, getTodoListByTitle, checkedTitle, handleDeleteItem } = this.props
    handleDeleteItem(content)
    // // 刷新一下
    getTodoListByTitle(checkedTitle.id)
  }

  render() {
    const { content } = this.props
    return (
      <div 
        className={styled.list}
      >
        <IconFont
          type={content.isFinish ? "icon-yiwancheng" : "icon-weiwancheng"} 
          className={styled.finish} 
          onClick={this.handleFinishClick} 
        />
        <div onClick={this.handleClick} className={`${styled.content} ${content.isFinish ? styled.finished : ''}`}>
          {content.listName}
        </div>
        <Icon type="star" className={styled.star} onClick={this.handleStarClick} theme={content.isStar ? "filled" : ""} />
        <Icon 
          className={styled.close} 
          type="close"
          onClick={this.handleDelete}
        />
      </div>
    )
  }
}

export default TodoItem