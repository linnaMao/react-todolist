import React from 'react';
import styled from './index.scss';
import { Menu, Dropdown, Button } from 'antd';
import { message } from 'antd';
import { IconFont } from '../Iconfont';

import { modifyListTitle } from '../../axios'

const { Item } = Menu

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      titleValue: props.checkedTitle.titleName
    }
    this.titleFocus = React.createRef()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      titleValue: nextProps.checkedTitle.titleName
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    })
  }

  handleHideClick = () => {
    const { handleHideClick } = this.props
    handleHideClick()
  }

  handleDeleteTitle = () => {
    const { handleDeleteTitle } = this.props
    handleDeleteTitle()
  }

  // 修改标题
  handleModifyTitle = (e) => {
    const { titleValue } = this.state
    const { checkedTitle, getTitle } = this.props
      if (e.nativeEvent.keyCode === 13 && titleValue !== "") {
        // 更改数据库
        modifyListTitle(checkedTitle.id, titleValue)
        // 更新页面
        getTitle()
        this.titleFocus.current.blur()
      } else if (e.nativeEvent.keyCode === 13 && titleValue === "") {
        message.error('标题不能为空~')
        this.setState({
          titleValue: checkedTitle.titleName
        })
      }
  }

  render() {
    const { hideTitle, checkedTitle } = this.props
    const { titleValue } = this.state
    const menu = (
      <Menu>
        <Item className={styled.item} onClick={this.handleHideClick}>
          <IconFont type="icon-yiwancheng" />
          {hideTitle ? "显示已完成任务" : "隐藏已完成任务"}
        </Item>
        <Item className={styled.item} onClick={this.handleDeleteTitle}>
          <IconFont type="icon-lajitong-copy" />
          删除清单
        </Item>
      </Menu>
    );
    return (
      <div className={styled.headerWrap}>
        {
          checkedTitle.icon==="icon-hanbao" ? <input 
          className={styled.title}
          value={titleValue}
          type="text"
          onChange={this.handleTitleChange}
          onKeyPress={this.handleModifyTitle}
          ref={this.titleFocus}
        />:
          <div className={styled.title}>{checkedTitle.titleName}</div>
        }
        <div className={styled.more}>
          <Dropdown overlay={menu}>
            <Button 
              className={styled.moreButton}
            >
              · · ·
            </Button>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header