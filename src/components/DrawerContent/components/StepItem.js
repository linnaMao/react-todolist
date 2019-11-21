import React from 'react';
import IconFont from '../../IconFont'

class StepItem extends React.Component {

  handleFinishClick = () => {
    const { handleFinishClick, content,  } = this.props
    handleFinishClick(content.id)
  }

  render() {
    const { content } = this.props
    return (
      <div>
        <IconFont 
          type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"}
          onClick={this.handleFinishClick}  
        />
        <span>{content.title}</span>
      </div>
    )
  }
}

export default StepItem