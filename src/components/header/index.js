import React from 'react';
import styled from './index.scss'

class Header extends React.Component {
  render() {
    const { homeTitle } = this.props
    return (
      <div className={styled.homeTitle}>
        <h1>{homeTitle}</h1>
      </div>
    )
  }
}

export default Header