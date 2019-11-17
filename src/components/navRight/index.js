import React from 'react';
import styled from './index.scss';
import TodoStep from './TodoStep';
import Step from '../../db/Entity/Step';
import { Icon } from 'antd';
import { IconFont } from '../common/common';
import { 
  addMyDay, 
  addRemark, 
  addStep, 
  deleteStep, 
  stepFinish 
} from '../../axios/index' 


class NavRight extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checkedTodo: props.checkedTodo,
      step: props.checkedTodo ? [...props.checkedTodo.step] : [],
      value: '',
      remarkValue: props.checkedTodo ? props.checkedTodo.remark : ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: nextProps.checkedTodo ? [...nextProps.checkedTodo.step] : [],
      checkedTodo: nextProps.checkedTodo,
      remarkValue: nextProps.checkedTodo ? nextProps.checkedTodo.remark : ""
    })
  }

  // 获取value值
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  //  获取备注值
  handleRemarkChange = (e) => {
    this.setState({
      remarkValue: e.target.value
    })
  }

  // 点击enter键添加todo
  handleEnterClick = (e) => {
    const { value, step, checkedTodo } = this.state
    const { getTodoListByTitle, currentTodoType } = this.props
    if (e.nativeEvent.keyCode === 13 && value !== "") {
      this.setState({
        step: [
          ...step,
          new Step(checkedTodo.id, value)
        ],
        value: ''
      },() => {
        //根据id查找
        addStep(checkedTodo.id,this.state.step)
        getTodoListByTitle(currentTodoType)
      })
    }
    // 
  }

  // 点击完成todo
  handleFinishClick = (content) => {
    const { checkedTodo, getTodoListByTitle, currentTodoType } = this.props
    // 获取todo的id和step的id
    stepFinish(checkedTodo.id, content.id)
    getTodoListByTitle(currentTodoType)
  }

  // 删除todo
  handleClick = (index) => {
    const { step, checkedTodo } = this.state;
    const { getTodoListByTitle, currentTodoType } = this.props
    step.splice(index, 1);
    this.setState({
      step:[...step]
    })
    deleteStep(checkedTodo.id, [...step])
    getTodoListByTitle(currentTodoType)
  }

  // 添加到我的一天
  handleAddMyDay = () => {
    const { getTodoListByTitle, checkedTodo, currentTodoType } = this.props
    // 修改数据库
    addMyDay(checkedTodo.id)
    // 刷新页面
    getTodoListByTitle(currentTodoType, checkedTodo.id)
  }

  // 跳出备注区域
  handleBlur = () => {
    const { getTodoListByTitle, checkedTodo, currentTodoType } = this.props
    // 修改数据库
    addRemark(checkedTodo.id, this.state.remarkValue)
    // 刷新页面
    getTodoListByTitle(currentTodoType)
  }

  getTodoItem() {
    const { step, checkedTodo } = this.state
    const { currentTodoType, getTodoListByTitle } = this.props
    return (
      step.map((item, index) => (
        <TodoStep
          key={item.id}
          content={item}
          handleClick={() => this.handleClick(index)}
          checkedTodo={checkedTodo}
          getTodoListByTitle={getTodoListByTitle}
          currentTodoType={currentTodoType}
          handleFinishClick={this.handleFinishClick}
        />
      ))
    )
  }

  render() {
    const { checkedTodo } = this.props
    const { value, remarkValue } = this.state
    // 对checkoutTodo做一个判断
    if (checkedTodo === null || checkedTodo === undefined) {
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
        {
          checkedTodo.type !== "我的一天" &&
          <div className={styled.addMyDay} onClick={this.handleAddMyDay}>
            <IconFont type="icon-taiyang" />
            <span>添加到"我的一天"</span>
          </div>
        }
        <div className={styled.remark}>
          <textarea 
            rows="20" 
            placeholder="添加备注" 
            onBlur={this.handleBlur}
            value={remarkValue}
            onChange={this.handleRemarkChange}
          />
        </div>
      </div>
    )
  }
}

export default NavRight