import React, { Component } from 'react'
import { Button } from 'antd';

// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('light');
function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        console.log(theme)
        return <Button {...props} theme={theme} />
      }}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

class Page1 extends Component {
  render(){
    return(
      <div className="content">
        hello,路明非
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      </div>
      
    )
  }
}

export default Page1