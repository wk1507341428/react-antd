import React, { Component } from 'react'
import { Table,Input } from 'antd'
// 连接 React 组件与 Redux store
// https://www.redux.org.cn/docs/react-redux/api.html
import { connect } from 'react-redux'

const Search = Input.Search;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  width: 150,
},
{
  title: '姓名',
  dataIndex: 'name',
  width: 150,
}, {
  title: '内容',
  dataIndex: 'content',
}, {
  title: '时间',
  dataIndex: 'time',
  width: 150,
}];


class Form extends Component {

  constructor(){
    super()
    this.state={}
  }

  componentDidMount(){
    let data = this.props.messageBox
    this.setState({data})
  }

  handleSearchName = (value)=>{
    value = value.trim()
    let data = this.props.messageBox
    this.setState({
      data:value===""?this.props.messageBox:data.filter(item => item.name.indexOf(value) !== -1)
    })
  }

  render(){
    let {data} = this.state
    return(
      <div ref="content" className="content" style={{padding:"20px",height:"100%"}} >
        <Search placeholder="input search name"
          onSearch={value => this.handleSearchName(value)}
          style={{ width: 200 }}/>
         <Table rowKey={ (data) => data.id } style={{marginTop:"20px"}} 
          columns={columns} dataSource={data} 
          pagination={{ pageSize: 10 }} scroll={{ y: 270 }} />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    messageBox:state.messageBox||[]
  }
}

export default connect(mapStateToProps)(Form)