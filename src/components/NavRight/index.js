import React from 'react';
import styled from './index.scss';
import TodoStep from './TodoStep';
import Step from '../../db/Entity/Step';
import Moment from '../Moment'
import { Alert } from 'antd';
import { IconFont } from '../Iconfont';
import { 
  addMyDay, 
  addRemark, 
  addStep, 
  deleteStep, 
  stepFinish,
  modifyStep,
  modifyTitle
} from '../../axios/index' 


class NavRight extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // checkedTodo: props.checkedTodo,
      step: props.checkedTodo ? [...props.checkedTodo.step] : [],
      stepValue: '',
      remarkValue: props.checkedTodo ? props.checkedTodo.remark : "",
      titleValue: props.checkedTodo ? props.checkedTodo.title : "",
      remarkTime: props.checkedTodo ? props.checkedTodo.remarkTime: ""
    }
    // 创建一个ref来存储textFocus中的Dom元素
    this.textFocus = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: nextProps.checkedTodo ? [...nextProps.checkedTodo.step] : [],
      // checkedTodo: nextProps.checkedTodo,
      remarkValue: nextProps.checkedTodo ? nextProps.checkedTodo.remark : "",
      titleValue: nextProps.checkedTodo ? nextProps.checkedTodo.title : "",
      remarkTime: nextProps.checkedTodo ? nextProps.checkedTodo.remarkTime: ""
    })
  }

  // 获取step值
  handleStepChange = (e) => {
    this.setState({
      stepValue: e.target.value
    })
  }

  //  获取备注值
  handleRemarkChange = (e) => {
    this.setState({
      remarkValue: e.target.value
    })
  }

  // 获取title值
  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    })
  }

  // 点击enter键添加todo
  handleEnterClick = (e) => {
    const { stepValue, step } = this.state
    const { getTodoListByTitle, currentTodoType, checkedTodo } = this.props
    if (e.nativeEvent.keyCode === 13 && stepValue !== "") {
      this.setState({
        step: [
          ...step,
          new Step(checkedTodo.id, stepValue)
        ],
        stepValue: ''
      },() => {
        //根据id查找
        addStep(checkedTodo.id,this.state.step)
        getTodoListByTitle(currentTodoType)
      })
    }
  }

  // 点击完成todo
  handleFinishClick = (content) => {
    const { checkedTodo, getTodoListByTitle, currentTodoType } = this.props
    // 获取todo的id和step的id
    stepFinish(checkedTodo.id, content.id)
    getTodoListByTitle(currentTodoType)
  }

  // 删除右列todo
  handleClick = (index) => {
    const { step } = this.state;
    const { getTodoListByTitle, currentTodoType, checkedTodo } = this.props
    step.splice(index, 1);
    this.setState({
      step:[...step]
    })
    deleteStep(checkedTodo.id, [...step])
    getTodoListByTitle(currentTodoType)
  }

  // 删除整个todo
  handleDeleteItem = () => {
    const { getTodoListByTitle, currentTodoType, checkedTodo, handleDeleteItem } = this.props
    handleDeleteItem()
    getTodoListByTitle(currentTodoType, checkedTodo.id)
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
    const { remarkValue } = this.state
    // 修改数据库
    addRemark(checkedTodo.id, remarkValue)
    if (remarkValue.trim().length === 0) {
      return this.setState({
        remarkValue:""
      })
    }
    getTodoListByTitle(currentTodoType)
  }

  // 修改标题
  handleModifyTitle = (e) => {
    const { titleValue } = this.state
    const { getTodoListByTitle, currentTodoType, checkedTodo } = this.props
    if (e.nativeEvent.keyCode === 13 && titleValue !== "") {
      // 更改数据库
      modifyTitle(checkedTodo.id, titleValue)
      // 更新页面
      getTodoListByTitle(currentTodoType)
      this.textFocus.current.focus()
    } else if (e.nativeEvent.keyCode === 13 && titleValue === "") {
      alert('标题不能为空')
      this.setState({
        titleValue: checkedTodo.title
      })
    }
  }

  // 修改step内容
  handleModifyStep = (stepId, value) => {
    const { getTodoListByTitle, checkedTodo, currentTodoType } = this.props
    // 更改数据库
    modifyStep(checkedTodo.id, stepId, value)
    // 通过current来访问DOM节点
    this.textFocus.current.focus()
    // 更新页面
    getTodoListByTitle(currentTodoType)
  }

  getTodoItem() {
    const { step } = this.state
    return (
      step.map((item, index) => (
        <TodoStep
          key={item.id}
          content={item}
          handleClick={() => this.handleClick(index)}
          handleFinishClick={this.handleFinishClick}
          handleModifyStep={this.handleModifyStep}
        />
      ))
    )
  }

  render() {
    const { checkedTodo, createTime } = this.props
    const { stepValue, remarkValue, titleValue, remarkTime } = this.state
    // 对checkoutTodo做一个判断
    if (checkedTodo === null || checkedTodo === undefined) {
      return <div></div>
    }
    return (
      <div>
        <div className={styled.header}>
          <div>
            <input 
              className={`${styled.title} ${checkedTodo.isFinish ? styled.finished : ''}`}
              type="text"
              value={titleValue}
              onChange={this.handleTitleChange}
              onKeyPress={this.handleModifyTitle}
            />
          </div>
          {this.getTodoItem()}
          <div className={styled.add}>
            <IconFont type="icon-hao-copy" className={styled.plus} />
            <input
              className={styled.addStep}
              placeholder="添加步骤"
              value={stepValue}
              onKeyPress={this.handleEnterClick}
              onChange={this.handleStepChange} 
              ref={this.textFocus}
            />
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
          <div 
            className={styled.remarkTime}
            style={{ display: (remarkValue === ""|| remarkValue.trim().length === 0)?"none":"block" }}
            >
              更新于{Moment.formateDate(remarkTime)}
          </div>
        </div>
        <div className={styled.createTime}>
          <div className={styled.time}>创建于{createTime}</div>
          <div className={styled.clearTip} onClick={this.handleDeleteItem}>
            <Alert message="删除任务" className={styled.tip} type="error" />
            <IconFont className={styled.clear} type="icon-lajitong" />
          </div>
          </div>
        </div>
    )
  }
}

export default NavRight