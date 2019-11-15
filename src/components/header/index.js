import React from 'react';
import styled from './index.scss'

class Header extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className={styled.title}>{title}</div>
    )
  }
}

export default Header