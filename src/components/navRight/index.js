import React from 'react';
import styled from './index.scss';
import TodoStep from './TodoStep'
import { Icon } from 'antd';
import { IconFont } from '../common/common'

class NavRight extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      checkedTodo: props.checkedTodo,
      step: props.checkedTodo ? [...props.checkedTodo.step] : [],
      value: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: nextProps.checkedTodo ? [...nextProps.checkedTodo.step] : [],
    })
  }

  // 获取value值
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  // 点击enter键添加todo
  handleEnterClick = (e) => {
    const { value } = this.state
    if (e.nativeEvent.keyCode === 13 && value !== "") {
      this.setState({
        step: [
          ...this.state.step,
          {
            id: new Date().getTime(),
            title: value,
            createTime: new Date().getTime(),
            isFinish: false,
          }
        ],
        value: ''
      })
    }
  }

  // 删除todo
  handleClick = (index) => {
    const { step } = this.state;
    step.splice(index, 1);
    this.setState({
      step:[...step]
    })
  }

  // 添加到我的一天
  handleAddMyDay = () => {
    const { getTodoListByTitle, checkedTodo } = this.props
    if (checkedTodo.isAddToMyDay) {
      // 修改数据库
      // 刷新页面
      getTodoListByTitle("我的一天")
    } 
  }

  handleBlur = () => {
    const { getTodoListByTitle, checkedTodo } = this.props
    // 修改数据库
    // 刷新页面
    getTodoListByTitle()
  }

  getTodoItem() {
    const { step } = this.state
    return (
      step.map((item, index) => (
        <TodoStep
          key={item.id}
          content={item}
          handleClick={() => this.handleClick(index)}
        />
      ))
    )
  }

  render() {
    const { checkedTodo } = this.props
    const { value } = this.state
    if (checkedTodo === null) {
      return <div></div>
    }
    return (
      <div>
        <div className={styled.header}>
          <div>
            <div className={`${styled.title} ${checkedTodo.isFinish ? styled.finished : ''}`}>{checkedTodo.title}</div>
          </div>
          {this.getTodoItem()}
          <div className={styled.add}>
            <Icon type="plus" className={styled.plus} />
            <input
              className={styled.addStep}
              placeholder="添加步骤"
              value={value}
              onKeyPress={this.handleEnterClick}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className={`${styled.addMyDay} ${checkedTodo.isAddToMyDay ? styled.added : ''}`} onClick={this.handleAddMyDay}>
          <IconFont type="icon-taiyang" />
          <span>{ checkedTodo.isAddToMyDay ? '已添加到"我的一天"': '添加到"我的一天"'}</span>
        </div>
        <div className={styled.remark}>
          <textarea 
            rows="20" 
            placeholder="添加备注" 
            defaultValue={checkedTodo.remark}
            onBlur={this.handleBlur}
            />
        </div>
      </div>
    )
  }
}

export default NavRight