import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from './Button';
import TextField from './TextField';
import Autocomplete from './Autocomplete';
import { customAutoCompleteStyle } from './Autocomplete';
import { symbolLookUp, getStockNews } from '../actions';


function Main({forwardedRef}) {

    useEffect(() => {

    }, [])

    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");

    return (
    <div className="App" ref={forwardedRef}>
      Let's run some sentimental analysis on stocks!
      <p style={{ fontSize: "22px" }} >To get started, enter the stock ticker symbol you'd like to analyze.</p>
      <div style={{ width: "50%", margin: "35px" }}>
          <Autocomplete
              freeSolo
              options={suggestions.map((option) => option.symbol)}
              classes={customAutoCompleteStyle()}
              renderInput={(params) => (
                  <TextField {...params}
                             label="Enter Stock Ticker Symbol"
                             variant="outlined"
                             value={search}
                             onChange={async (e) => {
                                 setSearch(e.target.value)
                                 setSuggestions(await symbolLookUp(e.target.value))
                             }}
                  />
              )}
          />
      </div>
      <Button style={{ width: "15%", fontSize: "18px"}} onClick={async () => {
          const newsList = await getStockNews(search);
      }}>Analyze</Button>
    </div>

    );
}

export default Main;
