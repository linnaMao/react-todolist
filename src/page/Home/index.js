import React from 'react';
import styled from './index.scss';
import { Icon } from 'antd';
import TodoConfig from '../../config/todoConfig'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505436_zu9876o8q68.js',
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
  }
  componentDidMount() {
    const todoList = this.todoList(TodoConfig);
    this.setState({
      todoList
    })
  }

  todoList = (data) => {
    return data.map((item) => (
      <li key={item.key}>
        <IconFont type="icon-weiwancheng" className={styled.finish} />
        <span>{item.value}</span>
        <Icon type="star" className={styled.star} />
      </li>
    ))
  }
  render() {
    const { todoList } = this.state
    return (
      <div className={styled.content}>
          <ul className={styled.todoList}>
            {todoList}
          </ul>
      </div>
    )
  }
}

export default Home