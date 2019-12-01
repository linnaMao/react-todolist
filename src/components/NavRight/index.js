import React from 'react';
import styled from './index.scss';
import TodoStep from './TodoStep';
import Moment from '../Moment'
import { Alert, message } from 'antd';
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
      stepValue: '',
      remarkValue: props.checkedTodo.remark,
      titleValue: props.checkedTodo.listName
    }
    // 创建一个ref来存储textFocus中的Dom元素
    this.textFocus = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remarkValue: nextProps.checkedTodo.remark,
      titleValue: nextProps.checkedTodo.listName
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
    const { stepValue } = this.state
    const { getTodoListByTitle, checkedTitle, checkedTodo } = this.props
    if (e.nativeEvent.keyCode === 13 && stepValue !== "") {
      this.setState({
        stepValue: ''
      },() => {
        //根据id查找
        addStep(checkedTodo.id, stepValue)
        getTodoListByTitle(checkedTitle.id)
      })
    }
  }

  // 点击完成todo
  handleFinishClick = (content) => {
    const { getTodoListByTitle, checkedTitle } = this.props
    // 获取todo的id和step的id
    stepFinish(content.id)
    getTodoListByTitle(checkedTitle.id)
  }

  // 删除右列todo
  handleClick = (item) => {
    const { getTodoListByTitle, checkedTitle } = this.props
    deleteStep(item.id)
    getTodoListByTitle(checkedTitle.id)
  }

  // 删除整个todo
  handleDeleteItem = () => {
    const { getTodoListByTitle, checkedTitle, handleDeleteItem } = this.props
    handleDeleteItem()
    getTodoListByTitle(checkedTitle.id)
  }

  // 添加到我的一天
  handleAddMyDay = () => {
    const { getTodoListByTitle, checkedTodo, checkedTitle } = this.props
    // 修改数据库
    addMyDay(checkedTodo.id)
    // 刷新页面
    getTodoListByTitle(checkedTitle.id)
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
    const { getTodoListByTitle, checkedTitle, checkedTodo } = this.props
    if (e.nativeEvent.keyCode === 13 && titleValue !== "") {
      // 更改数据库
      modifyTitle(checkedTodo.id, titleValue)
      // 更新页面
      getTodoListByTitle(checkedTitle.id)
      this.textFocus.current.focus()
    } else if (e.nativeEvent.keyCode === 13 && titleValue === "") {
      message.error('标题不能为空~')
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

  renderTodoItem = () => {
    const { checkedTodo } = this.props
    console.log(checkedTodo)
    return (
      checkedTodo.step.map((item, index) => (
        <TodoStep
          key={item.id}
          content={item}
          handleClick={() => this.handleClick(item)}
          handleFinishClick={this.handleFinishClick}
          handleModifyStep={this.handleModifyStep}
        />
      ))
    )
  }

  render() {
    const { checkedTodo, createTime } = this.props
    const { stepValue, remarkValue, titleValue, remarkTime } = this.state
    console.log(titleValue)
    // 对checkoutTodo做一个判断
    if (checkedTodo === null || checkedTodo === undefined) {
      return <div />
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
          {this.renderTodoItem()}
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
        {!checkedTodo.isAddMyDay &&
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