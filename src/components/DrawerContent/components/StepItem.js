import React from 'react';
import IconFont from '../../IconFont';
import styled from '../index.scss';

// import { changeContent } from '../../../axios1'

class StepItem extends React.Component {

  state = {
    isHideCursor:false,
    value: this.props.content.title
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleFinishClick = () => {
    const { handleFinishClick, content,  } = this.props
    handleFinishClick(content.id)
  }

  handleModifyStep = (e) => {
    const { value } = this.state
    const { handleModifyStep, content } = this.props
    if (e.nativeEvent.keyCode === 13 && value !== "") {
      handleModifyStep(content.id,value)
    } if (value === "") {
      alert('内容不能为空')
      this.setState({
        value: this.props.content.title
      })
    }
  }

  render() {
    const { content } = this.props
    const { value } = this.state
    return (
      <div className={styled.children}>
        <IconFont 
          className={styled.childrenFinish}
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"}
          onClick={this.handleFinishClick}  
        />
        {/* <div 
          className={styled.childrenStep} 
          onClick={this.handleContentClick} 
          style={ {isModify} ? {display: "none"} :{} }
        >
          {content.title}
        </div> */}

        <input 
          className={`${styled.childrenStepInput} `} 
          type="text"
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleModifyStep}
        />
      </div>
    )
  }
}

export default StepItem