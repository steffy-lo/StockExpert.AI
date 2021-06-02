import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from './Button';
import TextField from './TextField';
import Autocomplete from './Autocomplete';
import { customAutoCompleteStyle } from './Autocomplete';
import { symbolLookUp, getStockNews, getExpertAiToken, getSentimentAnalysis } from '../actions';
import Loader from './Loader';
import { LabelOff } from '@material-ui/icons';


function Main({forwardedRef}) {
    const [news, setNews] = useState([]);
    const [expertAiToken, setExpertAiToken] = useState("");
    const [mean, setMean] = useState();
    const [loading, setLoading] = useState(false);

    const getAndSetExpertAiToken = async () => {
        setExpertAiToken(await getExpertAiToken());
    }

    useEffect(() => {
        getAndSetExpertAiToken()
    }, [])


    useEffect(() => {
        if(mean!==undefined) console.log("Mean: "+mean)
    }, [mean])

    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");

    const feedNewsToAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getSentimentAnalysis(expertAiToken, item.content);
                resolve(result);
            });
        })
        Promise.all(requests).then((result) => {
            calculateMean(result);
            calculateMedian(result);
        });
    }

    const calculateMean = (result) =>{
        let sum = result.reduce((acc,currentValue)=>{
            return acc + currentValue.overall;
        },0)
        console.log("Sum: "+sum)
        setMean(sum/30);
    }

    const calculateMedian = (result) =>{
        result.sort((a, b) => (a.overall > b.overall) ? 1 : -1)
        console.log("Median: "+result[14].overall)
    }
    return (
    <div className="App" ref={forwardedRef}>
         <p style={{ marginBottom: "0.2rem" }}>{loading?`Analyzing 30 news sources related to ${search.toUpperCase()} stock...`:"Let's run some sentimental analysis on stocks!"}</p>
         <p style={{ fontSize: "22px" }} >{loading?`Please wait for a moment.`:"To get started, enter the stock ticker symbol you'd like to analyze."}</p>
         <div style={{ width: "50%", margin: "35px", display: loading?"none":"block" }}>
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
         {!loading?<Button style={{ width: "15%", fontSize: "18px"}} onClick={async () => {
             const newsList = await getStockNews(search);
             setNews(newsList);
             feedNewsToAPI(newsList);
             setLoading(true);
         }}>Analyze</Button>:<Loader/>}
       
    </div>

    );
}

export default Main;
