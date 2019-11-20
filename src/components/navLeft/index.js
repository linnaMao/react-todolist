import React from 'react';
import styled from './index.scss';
import IconFont from '../IconFont';
import navConfig from '../../config/navConfig'
import { Menu } from 'antd';

const { Item } = Menu

class NavLeft extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuList: []
    }
  }

  componentDidMount() {
    const menuList = this.listItem(navConfig)
    this.setState({
      menuList
    })
  }

  // 获取左侧title
  handleLeftTitle = (title) => {
    const { handleLeftTitle } = this.props
    handleLeftTitle(title)
  }

  // 列出菜单
  listItem = (navList) => {
    return navList.map((item) => (
      <Item key={item.key} onClick={() => this.handleLeftTitle(item.title)}>
        <IconFont type={item.icon} />
        {item.title}
      </Item>
    ))
  }

  render() {
    const  { menuList } = this.state
    return (
      <div>
        <div className={styled.leftTitle}>
          <IconFont type="icon-account" />
          <span className={styled.username}>毛栗子</span>
          <IconFont type="icon-glass" className={styled.search} />
        </div>
        <Menu 
          defaultSelectedKeys="/admin/day"
        >
          {menuList}
        </Menu>
      </div>
    )
  }
}

export default NavLeft