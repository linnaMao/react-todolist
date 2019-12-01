import React from 'react';
import styled from './index.scss';
import { IconFont } from '../Iconfont'

import { insertTodo } from '../../axios';

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
   this.setState({
     value: e.target.value
   })
  }

  handleEnterKey = (e) => {
    const { value } = this.state
    const { getTodoListByTitle, checkedTitle } = this.props

    if (e.nativeEvent.keyCode === 13 && value !== "") {
      // 发起请求存todo
      insertTodo(value, checkedTitle.id, checkedTitle.titleName === "重要", checkedTitle.titleName === "我的一天")
      this.setState({
        value: ''
      })
      // 更新页面
      getTodoListByTitle(checkedTitle.id)
    }
    
  }

  render() {
    const { value } = this.state
    return (
      <div >
        <div className={styled.footer}>
          <IconFont type="icon-hao-copy" />
          <input 
            value={value}
            className={styled.add}  
            placeholder="添加任务" 
            onChange={this.handleChange} 
            onKeyPress={this.handleEnterKey} 
          />
        </div>
      </div>
    )
  }
}

export default Footer