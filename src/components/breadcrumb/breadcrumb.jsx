import React, { Component } from 'react'
import {Breadcrumb } from 'antd'
// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. 
// withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
import {withRouter} from 'react-router-dom'

const breadcrumbNameMap = {
  '/': '首页',
  '/msgBoard': '交流天地',
  '/msgBoard/LeaveMsg': '留言板',
  '/msgBoard/add': '我要留言',
  '/msgBoard/edit': '编辑'
}



class BreadcrumbDom extends Component {

  render(){
    const { location } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      // 截取数组重新拼合
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          {breadcrumbNameMap[url]}
        </Breadcrumb.Item>
      )
    })

    return(
      <Breadcrumb>
        {extraBreadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default withRouter(BreadcrumbDom)