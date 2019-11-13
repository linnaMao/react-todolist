import React from 'react';
import styled from './index.scss';
import { Menu, Avatar, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import NavConfig from '../../config/navConfig';

const { SubMenu, Item } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505436_zu9876o8q68.js',
});

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList:[],
      navCreate: []
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
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key} >
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Item key={item.key}>
        <IconFont type={item.icon}></IconFont>
        {/* <NavLink to={item.key}>{item.title}</NavLink> */}
        {item.title}
      </Item>
    })
  };

  render() {
    const { navList } = this.state
    return (
      <div>
        <div className={styled.user}>
          <Avatar icon="user" className={styled.userImg} ></Avatar>
          <span className={styled.username}>毛某某</span>
          <Icon type="search" className={styled.search} />
        </div>
        <Menu theme="light">
          {navList}
        </Menu>
        {/* <div className={styled.hr}></div>
        <div>
          <ul>
            <li>xixi</li>
            <li>xixi</li>
            <li>xixi</li>
            <li>xixi</li>
          </ul>
        </div> */}
      </div>
    )
  }
}

export default NavLeft