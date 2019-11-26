import React from 'react';
import { Icon } from 'antd';
import styled from './index.scss';
import { IconFont } from '../Iconfont';

class TodoStep extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.content.title
    }
  }

  handleChangeStep = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  
  // 删除step
  handleCloseClick = () => {
    const { handleClick, index } = this.props
    handleClick(index)
  }

  // 修改step
  handleModifyStep = (e) => {
    const { value } = this.state
    const { content, handleModifyStep } = this.props
    if (e.nativeEvent.keyCode === 13 && value !== "")  {
      handleModifyStep(content.id, value)
    } else if(value === "") {
      alert('内容不能为空')
      this.setState({
        value: content.title
      })
    }
  }

  // 是否完成step
  handleFinishClick = () => {
    const { handleFinishClick, content } = this.props
    handleFinishClick(content)
  }

  render() {
    const { content } = this.props
    const { value } = this.state
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
          <input 
            className={`${styled.rightStep} ${content.isFinish?styled.finished:''}`} 
            type="text"
            value={value}
            onChange={this.handleChangeStep}
            onKeyPress={this.handleModifyStep}
          />
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