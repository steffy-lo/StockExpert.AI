import React, {useEffect, useState} from 'react';
import '../App.css';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Autocomplete, {customAutoCompleteStyle} from '../components/Autocomplete';
import {getStockNews, symbolLookUp} from '../actions';
import {getArticle, removeTags} from '../utils';
import Loader from '../components/Loader';

//******** MOCK DATA *****************//
import { newsListData } from "../mock_data";

import Result from "../components/Result";

function Main({forwardedRef, user, setUser}) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        if(news.length > 0) {
            setLoading(false);
            setShowResults(true);
        }
    }, [news])

    return (
    <div className="App" ref={forwardedRef}>
         <p style={{ marginBottom: "0.2rem" }}>{loading?`Analyzing 15 news sources related to ${search.toUpperCase()} stock...`:
         showResults? "Thank you for waiting.":"Let's run some sentimental analysis on stocks!"}</p>
         <p style={{ fontSize: "22px" }} >{loading?`Please wait for a moment.`:showResults?`Here are the results for ${search.toUpperCase()} stock.`:"To get started, enter the stock ticker symbol you'd like to analyze."}</p>
         <div style={{ width: "50%", margin: "35px", display: loading || showResults ?"none":"block" }}>
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
         {loading?<Loader/>:showResults?null:<Button style={{ width: "15%", fontSize: "18px"}} onClick={async () => {
             setLoading(true);
             const newsList = await getStockNews(search);
             for (let i = 0; i < newsList.length; i++) {
                 const article = await getArticle(newsList[i].url)
                 if (article) {
                     // expert.ai text input supports up to 10,000 characters for free version
                     newsList[i].content = removeTags(article.content).slice(0, 10000);
                 }
             }
             setNews(newsList)


             // set Mock Data to save API calls
             // get only the necessary properties from news
             // const filteredNews = newsListData.map(({ title, url, content }) => ({
             //     title, url, content
             // }));
             // setNews(filteredNews);

         }}>Analyze</Button>}

         {/****************** RESULTS *************************/}
         {showResults?
            <Result news={news} search={search} user={user} setUser={setUser} history={false}/>
         :null}

         
       
    </div>

    );
}

export default Main;
