import React, { Component } from 'react'
import { Input, Icon, Row, Col, Button, message} from 'antd';
import Xdate from '../../../assets/js/Xdate.js'
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom"
import { addMessage,updateMessage } from '../../../store/actions/message-actions.js'
import './editMsg.scss'

const { TextArea } = Input;

class editMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      content:""
    };
  }

  componentDidMount(){
    // 如果是修改的话
    let data = this.props.location&&this.props.location.state&&this.props.location.state.data
    if(data){
      this.setState({name:data.name,content:data.content,id:data.id})
    }
  }

  // 提交信息
  handleSubmit = ()=>{
    let {name,content,id} = this.state
    if(name.trim()===""||content.trim()===""){
      return message.error("请填写完整内容")
    }
    // 记录一下提交时间
    let date = new Date().getTime()
    let time = new Xdate(date).format('yyyy-MM-dd HH:mm:ss')
    if(id){
      // 改值
      this.props.dispatch(updateMessage(id,name,content,time))
      message.success('修改成功')
      this.props.history.push({pathname:'/msgBoard/LeaveMsg'})
    }
    else{
      // 存值
      this.props.dispatch(addMessage(name,content,time))
      message.success('添加成功')
      this.setState({name:"",content:"",time:""})
    }
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ name: '' });
  }

  onChangeUserName = (e) => {
    this.setState({ name: e.target.value });
  }

  onChangeContent = (e) => {
    this.setState({ content: e.target.value });
  }


  render(){

    const { name,content } = this.state;
    const suffix = name ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return(
      <div className="addMessage">
        <div className="content">
          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}><label htmlFor="userName">我的姓名</label></Col>
            <Col span={20}>            
              <Input
                id="userName" placeholder="请输入姓名..."
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix} value={name} onChange={this.onChangeUserName}
                ref={node => this.userNameInput = node}/>
            </Col>
          </Row>
          <Row style={{marginTop:"20px"}} type="flex" justify="space-around" align="middle">
            <Col span={4}><label htmlFor="textMain">留言内容</label></Col>
            <Col span={20}>            
              <TextArea placeholder="请输入留言内容..." onChange={this.onChangeContent}
               value={content} autosize={{ minRows: 6, maxRows: 10 }} />
            </Col>
          </Row>
          <Row style={{marginTop:"20px"}}>
            <Col span={24}>
              <Button onClick={this.handleSubmit} type="primary" block>Primary</Button>
            </Col>
          </Row>
        </div> 
      </div>
    )
  }
}


export default connect()(withRouter(editMsg))