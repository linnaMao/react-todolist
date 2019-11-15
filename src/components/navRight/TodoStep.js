import React from 'react';
import { Icon } from 'antd';
import styled from './index.scss';
import { IconFont } from '../common/common';
import { stepFinish } from '../../axios'

class TodoStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFinish: props.content.isFinish
    }
  }

  // 删除step
  handleCloseClick = () => {
    const { handleClick, index } = this.props
    handleClick(index)
  }

  // 是否完成step
  handleFinishClick = () => {
    const { isFinish } = this.state
    const { checkedTodo, content, getTodoListByTitle, currentTodoType } = this.props
    // 获取todo的id和step的id
    stepFinish(checkedTodo.id, content.id)
    this.setState({
      isFinish: !isFinish
    })
    getTodoListByTitle(currentTodoType)
  }

  render() {
    const { content } = this.props
    const { isFinish } = this.state
    return (
      <div 
        className={styled.todoStep} 
        >
        <IconFont 
          className={styled.finish} 
          type={isFinish?"icon-yiwancheng":"icon-weiwancheng"} 
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