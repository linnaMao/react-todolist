import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505436_zu9876o8q68.js',
});

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { content } = this.props
    return (
      <div className={styled.list}>
        <IconFont type="icon-weiwancheng" className={styled.finish} />
        <span>{content}</span>
        <Icon type="star" className={styled.star} />
      </div>
    )
  }
}

export default TodoItem