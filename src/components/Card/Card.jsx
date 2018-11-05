import React from 'react'
import './card.scss'
import { connect } from 'react-redux'
import store from '../../store/store.js'
import {withRouter} from "react-router-dom"
import {addZIndex} from '../../store/actions/card-actions.js'
import {deleteMessage} from '../../store/actions/message-actions'

let body = document.getElementsByTagName("body")[0]
body.addEventListener("mouseup",function(e){
    // 0表示左键
    if(e.button!==0) return
    window.flag = false
})

class Card extends React.Component {
  constructor(){
    super()
    this.state={}
  }

  componentDidMount(){
    let zIndex = store.getState().cardZindex
    this.setState({zIndex})
  }

  componentWillReceiveProps(data){
    let position = data.position
    this.computeCardPosition(position)
  }

  // 计算卡片随机位置,并且存入state中
  computeCardPosition=(position)=>{
    let cardWidth = (this.refs.card&&this.refs.card.offsetWidth)||0
    let cardHeight = (this.refs.card&&this.refs.card.offsetHeight)||0
    let x = parseInt(Math.random() * (position.width-cardWidth))
    let y = parseInt(Math.random() * (position.height-cardHeight))
    this.setState({x,y,cardWidth,cardHeight})
  }

  // z-index 提升
  handleClick = ()=>{
    store.dispatch(addZIndex())
    let zIndex = store.getState().cardZindex
    this.setState({zIndex})
  }

  // 点击鼠标左键,开启阀门
  handleMouseDown = (e)=>{
    // 0表示左键
    if(e.button!==0) return
    // 计算距离
    let content = document.querySelector(".content")
    let offsetLeft = content.offsetLeft
    let offsetTop = content.offsetTop
    this.setState({
      offsetLeft,offsetTop
    })

    this.handleClick()
    window.flag = true
  }

  // 跟随鼠标移动
  handleMove = (e)=>{
    if(!window.flag) return
    let props = this.props
    let state = this.state
    let cardWidthHalf = state.cardWidth * .5
    let cardHeightHalf = state.cardHeight * .5
    let x = e.pageX - state.offsetLeft - cardWidthHalf
    let y = e.pageY - state.offsetTop - cardHeightHalf
    // 边界限制
    let boardWidth = props.position.width - cardWidthHalf*2
    let boardHeight = props.position.height - cardHeightHalf*2
    if(x<0)x=0
    if(x>boardWidth)x=boardWidth
    if(y<0)y=0
    if(y>boardHeight)y=boardHeight
    this.setState({x,y})
  }

  // 删除redux中的数据
  handleDelete = (e)=>{
    e.stopPropagation()
    this.props.dispatch(deleteMessage(this.props.data.id))
  }

  // 修改留言
  handleEditMessage = ()=>{
    // 这样可以把参数传到对应路由的props的location中
    this.props.history.push({pathname:'/msgBoard/edit',state:{data:this.props.data}})
  }

  render() {
    let state = this.state
    let position = {
      left: state.x,
      top: state.y,
      zIndex: state.zIndex
    }
    // 获取父元素传入的data
    let data = this.props.data
    // 这里感觉有问题，我想终止渲染，这样做也能达成目的,但是总感觉应该有API
    if(JSON.stringify(data)==="{}") {
      return(<div></div>)
    }

    return (
      <div ref="card"
        style={position} className="card">
        <div className="card_h">
          <div className="num">第[{data.id}]条 {data.time}</div>
          <div onClick={this.handleDelete} className="close" title="关闭纸条">×</div>
        </div>
        <div 
          onMouseMove={this.handleMove} 
          onMouseDown={this.handleMouseDown} className="card_c">
          {data.content}
        </div>
        <div className="card_f">
          <div onClick={this.handleEditMessage} className="icon">
            <img alt="" src={require('../../assets/images/bpic_1.gif')} />
          </div>
          <div className="name">{data.name}</div>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(Card))