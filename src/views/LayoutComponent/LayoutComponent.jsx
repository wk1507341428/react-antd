import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import './LayoutComponents.scss'
import {Route,Link,withRouter} from 'react-router-dom'
import LeaveMsg from '../msgBoard/LeaveMsg/LeaveMsg'
import editMsg from '../msgBoard/editMsg/editMsg'
import Home from '../Home/Home'
import Form from '../Other/Form/Form.jsx'
import Page2 from '../Other/Page2/Page2'
// 组件
import BreadcrumbDom from '../../components/breadcrumb/breadcrumb'
const SubMenu = Menu.SubMenu

const { Header, Sider, Content } = Layout



class LayoutComponent extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  componentDidMount(){}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleMenuClick = (e) => {
    switch(e.key){
      case "5":
        this.props.history.push({pathname:'/login'})
        break
      default:
        return
    }
  }

  render(){
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <SubMenu title='关于'>
          <Menu.Item key="1">合作伙伴</Menu.Item>
          <Menu.Item key="2">加入我们</Menu.Item>
        </SubMenu>
        <SubMenu title="毁灭世界" disabled>
          <Menu.Item key="3">5d menu item</Menu.Item>
          <Menu.Item key="4">6th menu item</Menu.Item>
        </SubMenu>
        <Menu.Item key="5"><Icon type="logout" theme="outlined" />登出</Menu.Item>
      </Menu>
    )
    const defaultOpenKeys = this.props.match.path||"/index"
    return(
      <div className="LayoutComponent">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" 
              defaultOpenKeys={[defaultOpenKeys]} forceSubMenuRender={true}
              // 默认选中
              defaultSelectedKeys={[this.props.location.pathname]}>
              <Menu.Item key="/">
                <Link to={{pathname:'/'}} replace>
                  <Icon type="user" /><span>首页</span>
                </Link>
              </Menu.Item>
              <SubMenu key="/msgBoard" title={<span><Icon type="facebook" /><span>交流天地</span></span>}>
                  <Menu.Item key="/msgBoard/LeaveMsg">
                    <Link to={{pathname:'/msgBoard/LeaveMsg'}} replace>留言板</Link>
                  </Menu.Item>
                  <Menu.Item key="/msgBoard/add">
                    <Link to={{pathname:'/msgBoard/add'}} replace>我要留言</Link>
                  </Menu.Item>
              </SubMenu>
              <SubMenu key="/other" title={<span><Icon type="facebook" /><span>其他展示</span></span>}>
                  <Menu.Item key="/other/Form">
                    <Link to={{pathname:'/other/Form'}} replace>不知道叫什么1</Link>
                  </Menu.Item>
                  <Menu.Item key="/other/Page2">
                    <Link to={{pathname:'/other/Page2'}} replace>不知道叫什么2</Link>
                  </Menu.Item>
              </SubMenu>              
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle} />
              {/* 头像下拉框 怎么添加Icon */}
              <Dropdown trigger={["click"]} overlay={menu}>
                <a style={{float:"right",padding:"0 24px"}} className="ant-dropdown-link" href="/">
                  <Avatar style={{ backgroundColor: '#eee' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a>
              </Dropdown>
            </Header>
            <div style={{margin:"12px 16px"}} className="Breadcrumb">
              <BreadcrumbDom />
            </div>
            <Content style={{ margin: '0px 16px 24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/" component={Home} />
              <Route path="/msgBoard/leaveMsg" component={LeaveMsg} />
              <Route path="/msgBoard/add" component={editMsg} />
              <Route path="/msgBoard/edit" component={editMsg} />
              <Route path="/other/Form" component={Form} />
              <Route path="/other/Page2" component={Page2} />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(LayoutComponent)