import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }

  handleChange = (e) => {
    const { handleChange } = this.props;
    handleChange(e)
  }

  handleEnterKey = (e) => {
    const { handlePress } = this.props
    handlePress(e)
  }

  render() {
    const { value } = this.props
    return (
      <div className={styled.footer}>
          <Icon type="plus" />
          <input 
            value={value}
            className={styled.add}  
            placeholder="添加任务" 
            onChange={this.handleChange} 
            onKeyPress={this.handleEnterKey} 
          />
        </div>
    )
  }
}

export default Footer