import React from 'react';
import IconFont from '../../IconFont';
import styled from '../index.scss'

class StepItem extends React.Component {

  handleFinishClick = () => {
    const { handleFinishClick, content,  } = this.props
    handleFinishClick(content.id)
  }

  render() {
    const { content } = this.props
    return (
      <div className={styled.children}>
        <IconFont 
          className={styled.childrenFinish}
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"}
          onClick={this.handleFinishClick}  
        />
        <div className={styled.childrenStep}>{content.title}</div>
      </div>
    )
  }
}

export default StepItem