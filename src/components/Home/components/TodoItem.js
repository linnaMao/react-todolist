import React from 'react';
import IconFont from '../../IconFont';
import styled from '../index.scss'

class TodoItem extends React.Component {
  render() {
    const { content } = this.props
    return (
      <div className={styled.homeListItem}>
        <IconFont type={content.isFinish?"icon-yiwancheng":"icon-weiwancheng"} className={styled.itemFinish} />
        <span>{content.title}</span>
        <IconFont type={content.isStar?"icon-start":"icon-kongxinxingxing-copy"} className={styled.itemStar} />
      </div>
    )
  }
}

export default TodoItem