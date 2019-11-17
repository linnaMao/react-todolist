import React from 'react';
import { Icon } from 'antd';
import styled from './index.scss';
import { IconFont } from '../common/common';

class TodoStep extends React.Component {
  
  // 删除step
  handleCloseClick = () => {
    const { handleClick, index } = this.props
    handleClick(index)
  }

  // 是否完成step
  handleFinishClick = () => {
    const { handleFinishClick, content } = this.props
    handleFinishClick(content)
  }

  render() {
    const { content } = this.props
    return (
      <div 
        className={styled.todoStep} 
        >
        <IconFont 
          className={styled.finish} 
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"} 
          onClick={this.handleFinishClick} 
          />
        <div className={styled.todoRight}>
          <span className={`${content.isFinish?styled.finished:''}`}>{content.title}</span>
          <Icon 
            className={styled.close} 
            type="close" 
            onClick={this.handleCloseClick}
            />
        </div>
      </div>
    )
  }
}

export default TodoStep