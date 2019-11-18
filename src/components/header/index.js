import React from 'react';
import styled from './index.scss'

class Header extends React.Component {
  render() {
    return (
      <div className={styled.homeTitle}>
        <h1>我的一天</h1>
      </div>
    )
  }
}

export default Header