import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LeaveMsg.scss'
import Card from '../../../components/Card/Card'

window.flag = false
class Page_1 extends Component {
  constructor() {
    super()
    this.state = {
      boardWidth: "",
      boardHeight: ""
    }
  }

  // 钩子函数
  componentDidMount() {
    this.getBoardInfo()
  }

  // 获取留言板容器宽和高并且存入state中
  getBoardInfo = () => {
    let messageBoard = this.refs.messageBoard
    let boardWidth = messageBoard.offsetWidth
    let boardHeight = messageBoard.offsetHeight
    
    this.setState({
      boardWidth,
      boardHeight,
    })
  }

  render() {
    // 将board的信息传入子组件，计算随机位置时候会用到
    var {boardWidth,boardHeight} = this.state
    let boardInfo = {
      width: boardWidth,
      height: boardHeight
    }

    // 动态渲染card
    let datas = this.props.messageBox
    const CardList = datas.map((item,i)=>{
      return(
        <Card key={i} position={boardInfo} data={item}/>
      )
    })
    return (
      <div className="messageBoard">
        <div className="content" ref="messageBoard">
          {CardList}
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

export default connect(mapStateToProps,null)(Page_1)