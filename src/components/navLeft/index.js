import React from 'react';
import styled from './index.scss';
import { Menu } from 'antd';
import { IconFont } from '../Iconfont';
import { getTitleList, insertTitle } from '../../axios'

const { Item } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList:[],
      titleValue: ''
    }
  }

  componentDidMount() {
    this.getTitle()
  };

  getTitle = () => {
    this.setState({
      navList: getTitleList()
    })
  }

  // 菜单
  renderList = (data) => {
    const { handleTitleClick } = this.props

    return data.map((item) => {
      console.log(item)
      return (
        <Item onClick={() => handleTitleClick(item)} key={item.id}>
          <IconFont type={item.icon} />
          {item.titleName}
        </Item>
      )
    })
  };

  // 获取title值
  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    })
  }

  // 新增标题
  handleAddTitleEnter = (e) => {
    const { titleValue } = this.state
    if (e.nativeEvent.keyCode === 13 && titleValue !== "") {
      insertTitle(titleValue)
      this.setState({
        titleValue: ""
      })
      this.getTitle()
    }
  }

  render() {
    const { navList, titleValue } = this.state
    return (
      <div>
        <div className={styled.user}>
          <IconFont type="icon-account" className={styled.userImg} />
          <span className={styled.username}>毛某某</span>
          <IconFont type="icon-glass" className={styled.search} />
        </div>
        <Menu defaultSelectedKeys="/admin/day" theme="light">
          {this.renderList(navList)}
        </Menu>
        <div className={styled.addNewList}>
          <IconFont type="icon-hao-copy" />
          <input 
            type="text" 
            placeholder="新建清单"  
            value={titleValue}
            onChange={this.handleTitleChange}
            onKeyPress={this.handleAddTitleEnter}
          />
        </div>
      </div>
    )
  }
}

export default NavLeft