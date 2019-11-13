import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd'

class Footer extends React.Component {
  render() {
    return (
      <div className={styled.footer}>
        <Icon type="plus" />
        <input className={styled.add} placeholder="添加任务" />
      </div>
      
    )
  }
}

export default Footer