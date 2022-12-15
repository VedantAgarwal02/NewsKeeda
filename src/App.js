import './App.css';
import Navbar from './components/Navbar';
import React, {useState} from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App =()=> {
  let pageSize=6;
  const apiKey = '12fd09e72c8d42579916c976c95a6f3f'
  const [progress, setProgress] = useState(0);
 
    return (
      <div>
        <Router>
          <LoadingBar 
          height={3.5}
          color='#57030a'
          progress={progress}
          />
        <Navbar/>
        {/* <News apiKey={apiKey} apiKey={apiKey} setProgress={setProgress}pageSize={pageSize} country="in" category="entertainment"/> */}
        <Routes>
          <Route path='/' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route path='/general' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route path='/business' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route path='/health' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route path='/science' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="technology"/>}></Route>
          <Route path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="sports"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }

export default App;
