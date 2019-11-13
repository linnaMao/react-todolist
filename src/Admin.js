import React from 'react';
import { Row, Col } from 'antd';
import styled from './style/common.scss';
import NavLeft from './components/navLeft';
import NavRight from './components/navRight';
import Header from './components/header'
import Footer from './components/footer'
import Home from './page/Home';
import 'antd/dist/antd.css';

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      click: false
    }
  }
  render() {
    return (
      <div>
        <Row type="flex" className={styled.container}>
          <Col span={4} className={styled.navLeft}>
            <NavLeft />
          </Col>
          <Col span={15} className={styled.main}>
            <Header />
            <Row className={styled.content}>
              <Home />
            </Row>
            <Footer />
          </Col>
          <Col span={5} className={styled.navRight}>
            <NavRight />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin