import React from 'react';
import IconFont from '../IconFont';
import styled from './index.scss'

class Footer extends React.Component {
  render() {
    return (
      <div className={styled.itemFooter}>
        <IconFont type="icon-hao" />
        <input type="text" placeholder="添加任务"/>
      </div>
    )
  }
}

export default Footer