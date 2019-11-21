import React from 'react';
import IconFont from '../../../IconFont';
import styled from './index.scss';
import StepItem from './components/StepItem';
import Step from '../../../../db1/Entity/Step';

import { insertStep, stepFinish } from '../../../../axios1'

class NavRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: props.checkedTodo?[...props.checkedTodo.step]:[],
      value: ""
    }
  }

  getStepItem = () => {
    const { step } = this.state
    return step.map((item) => {
      return <StepItem 
        key={item.id}
        content={item}
        handleFinishClick={this.handleFinishClick}
      />
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleEnterStep = (e) => {
    const {  value, step } = this.state
    const { checkedTodo,currentType, getTodoListByType } = this.props
    // 存储step
    if (e.nativeEvent.keyCode === 13 && value !== "") {
      this.setState({
        step: [
          ...step,
          new Step(checkedTodo.id, value)
        ],
        value: ""
      }, () => {
        insertStep(checkedTodo.id, [
          ...step,
          new Step(checkedTodo.id, value)
        ])
        // 更新页面
        getTodoListByType(currentType)
      })
    }
  }

  handleFinishClick = (stepId) => {
    const { checkedTodo,currentType, getTodoListByType } = this.props
    stepFinish(checkedTodo.id, stepId)
    // 更新页面
    getTodoListByType(currentType)
  }

  render() {
    const { value } = this.state
    return (
      <div className={styled.addStepAll}>
        {this.getStepItem()}
        <div className={styled.addStep}>
          <input 
            type="text" 
            placeholder="添加步骤" 
            value={value}
            onChange={this.handleChange}
            onKeyPress={this.handleEnterStep} />
        </div>
      </div>
    )
  }
}

export default NavRight