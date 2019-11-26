import React from 'react';
import styled from './index.scss';
import { Menu } from 'antd';
import NavConfig from '../../config/navConfig';
import { IconFont } from '../Iconfont'

const { SubMenu, Item } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList:[]
    }
  }

  componentDidMount() {
    const menuTree =  this.renderList(NavConfig)
    this.setState({
      navList: menuTree
    })
  };

  // 菜单
  renderList = (data) => {
    const { handleTitleClick } = this.props

    return data.map((item) => {
      return (
        <Item onClick={() => handleTitleClick(item.title)} key={item.key}>
          <IconFont type={item.icon} />
          {item.title}
        </Item>
      )
    })
  };

  render() {
    const { navList } = this.state
    return (
      <div>
        <div className={styled.user}>
          <IconFont type="icon-account" className={styled.userImg} />
          <span className={styled.username}>毛某某</span>
          <IconFont type="icon-glass" className={styled.search} />
        </div>
        <Menu defaultSelectedKeys="/admin/day" theme="light">
          {navList}
        </Menu>
      </div>
    )
  }
}

export default NavLeft