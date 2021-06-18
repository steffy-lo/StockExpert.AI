import React, { useRef } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Result from "./components/Result";
require('dotenv').config()

function Home({landing, main}){
    return(
      <div>
        <Landing forwardedRef={landing} mainRef={main}/>
        <Main forwardedRef={main}/>
      </div>
    )
}

function App() {
    const landing = useRef(null);
    const main = useRef(null);

    return (
        <Router>
            <Route exact path={["/", "/#main"]}>
                <Home landing={landing} main={main}/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
        </Router>
    );
}

export default App;
