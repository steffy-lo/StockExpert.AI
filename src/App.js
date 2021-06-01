import React, { useRef } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import TextField from './components/TextField';
import Autocomplete from './components/Autocomplete';
import { customAutoCompleteStyle } from './components/Autocomplete';
import { symbolLookUp, getStockNews, getExpertAiToken } from './actions';
import Landing from './pages/Landing';
import Main from './components/Main';

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
        </Router>
    );
}

export default App;
