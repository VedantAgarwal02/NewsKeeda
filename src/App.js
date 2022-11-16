import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=6;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar 
          height={3}
          color='#57030a'
          progress={this.state.progress}
          />
        <Navbar/>
        {/* <News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="entertainment"/> */}
        <Routes>
          <Route path='/' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route path='/general' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route path='/business' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="business"/>}></Route>
          <Route path='/entertainment' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="entertainment"/>}></Route>
          <Route path='/health' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="health"/>}></Route>
          <Route path='/science' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="science"/>}></Route>
          <Route path='/technology' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="technology"/>}></Route>
          <Route path='/sports' element={<News setProgress={this.setProgress}pageSize={this.pageSize} country="in" category="sports"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}

