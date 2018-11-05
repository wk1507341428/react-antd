import React, { PureComponent } from 'react'
import { Skeleton, Card, Icon, Avatar } from 'antd'
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom"
import './Home.scss'
import waterFall from '../../assets/js/WaterFall'
const { Meta } = Card

class Home extends PureComponent {
  
  constructor(){
    super()
    this.contentDom = React.createRef()
    this.cardDom = React.createRef()
    this.state={
      loading: true
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({loading:false})
      waterFall(this.contentDom.current)
    },1000)
   
  }

  componentDidUpdate(){}

  handleSetting = ()=>{
    console.log("设置")
  }

  handleEdit = (e,item)=>{
    this.props.history.push({pathname:'/msgBoard/edit',state:{data:item}})
  }

  render(){
    const { loading } = this.state
    const CartList = this.props.messageBox.map((item,i)=>{
      return(
        <Card   
          style={{width: 300,overflow:"hidden"}} key={i} className="Card"
          actions={[<Icon type="setting" onClick={this.handleSetting} />, 
                    <Icon type="edit" onClick={(e)=>{this.handleEdit(e,item)}} />,
                    <Icon type="ellipsis" />]}>
          <Skeleton loading={loading} avatar active>
            <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={item.name}
              description={item.content} />
          </Skeleton>
        </Card>
      )

    })
    return(
      <div style={{padding:"20px"}} className="content">
        <div style={{position:"relative",margin:"0 auto"}} ref={this.contentDom} className="cardBox">
          {CartList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    messageBox:state.messageBox||[]
  }
}

export default connect(mapStateToProps)(withRouter(Home))