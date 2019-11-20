import React from 'react';
import IconFont from '../../../IconFont';
import styled from './index.scss'

class NavRight extends React.Component {
  render() {
    return (
      <div className={styled.addStepAll}>
        <div>
          <IconFont type="icon-weiwancheng" />
          <span>1233</span>
        </div>
        <div className={styled.addStep}>
          <input type="text" placeholder="添加步骤"/>
        </div>
      </div>
    )
  }
}

export default NavRight