import React from 'react';
import { Icon } from 'antd';
import styled from './index.scss';
import { IconFont } from '../common/common'

class TodoStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFinish: props.content.isFinish
    }
  }

  // 删除todo
  handleCloseClick = () => {
    const { handleClick, index } = this.props
    handleClick(index)
  }

  // 是否完成todo
  handleFinishClick = () => {
    const { isFinish } = this.state
    this.setState({
      isFinish: !isFinish
    })
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