import React from 'react';
import styled from './index.scss';
import { Menu, Dropdown, Button } from 'antd';
import { IconFont } from '../Iconfont'

const { Item } = Menu

class Header extends React.Component {
  state = {
    hideTitle: false
  }
  handleHideClick = () => {
    const { handleHideClick } = this.props
    const { hideTitle } = this.state
    handleHideClick(hideTitle)
    this.setState({
      hideTitle: !hideTitle
    })
  }
  render() {
    const { title } = this.props
    const { hideTitle } = this.state
    const menu = (
      <Menu>
        <Item className={styled.item} onClick={this.handleHideClick}>
          <IconFont type="icon-yiwancheng" />
          {hideTitle ? "显示已完成任务" : "隐藏已完成任务"}
        </Item>
        <Item className={styled.item}>
          <IconFont type="icon-lajitong-copy" />
          删除清单
        </Item>
      </Menu>
    );
    return (
      <div className={styled.headerWrap}>
        <div className={styled.title}>{title}</div>
        <div className={styled.more}>
          <Dropdown overlay={menu}>
            <Button className={styled.moreButton}>· · ·</Button>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header