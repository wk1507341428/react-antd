import React, { Component } from 'react'
import LayoutComponent from './views/LayoutComponent/LayoutComponent'
import {HashRouter,Route} from 'react-router-dom'
import Login from './views/Login/Login'

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div id="App">
          <Route exact path="/" component={LayoutComponent} />
          <Route path="/msgBoard" component={LayoutComponent} />
          <Route path="/other" component={LayoutComponent} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    )
  }
}

export default App
