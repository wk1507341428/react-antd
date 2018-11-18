import React, { Component } from 'react'
import './markdownJS.scss'
import marked from 'marked'

class Editor extends Component {
  constructor(){
    super()
    this.state={
      content:""
    }
  }

  handleKeyUp = (e)=>{
    let content = marked(e.target.value)
    this.setState({content})
  }

  render(){
    let {content} = this.state
    return(
      <div className="editor-content">
        <textarea defaultValue={content} 
          onKeyUp={this.handleKeyUp} className="editor" id="editor"></textarea>
        <div className="preview" id="preview" dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
    )
  }
}

export default Editor