import React from "react";
import './App.css';
import Button from './components/Button';
import TextField from './components/TextField';
import Autocomplete from './components/Autocomplete';
import { customAutoCompleteStyle } from './components/Autocomplete';
import { symbolLookUp, getStockNews } from './actions';
import Landing from './pages/Landing';

function App() {

    React.useEffect(() => {

    }, [])

    const [suggestions, setSuggestions] = React.useState([]);
    const [search, setSearch] = React.useState("");

    return (
        <>
        <Landing/>
    <div className="App">
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
    </>
    );
}

export default App;
