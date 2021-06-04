import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from './Button';
import TextField from './TextField';
import Autocomplete from './Autocomplete';
import { customAutoCompleteStyle } from './Autocomplete';
import { symbolLookUp, getStockNews, getExpertAiToken, getSentimentAnalysis, getBehavioralTraits, getEmotionalTraits } from '../actions';
import Loader from './Loader';

//********CHARTS *******************//
import OverallSentiment from './OverallSentiment';
import BehaviouralTraits from './BehaviouralTraits';
import EmotionalTraits from './EmotionalTraits';

function Main({forwardedRef}) {
    const [news, setNews] = useState([]);
    const [expertAiToken, setExpertAiToken] = useState("");
    const [mean, setMean] = useState();
    const [behavioralTraits, setBehavioralTraits] = useState([]);
    const [emotionalTraits, setEmotionalTraits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const getAndSetExpertAiToken = async () => {
        setExpertAiToken(await getExpertAiToken());
    }

    useEffect(() => {
        getAndSetExpertAiToken()
    }, [])


    useEffect(() => {
        if(mean!==undefined) {
            console.log("Mean: "+mean)
            setLoading(false);
            setShowResults(true);
        }
    }, [mean])

    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");

    const fetchSentimentalAPI = async (news) =>{
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

    const fetchBehavioralTraitsAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getBehavioralTraits(expertAiToken, item.content);
                resolve(result);
            });
        })
        Promise.all(requests).then((result) => {
            const filtered = result.filter(item => item.length > 0);
            let behavioralTraits = []; //use for pie chart
            filtered.map(items=>{
                //item is an array
                items.forEach(item=>{
                    // check if label already exists, if true, just add percentage to it
                    if(behavioralTraits.some(e => e.name === item.label)){
                        let obj = behavioralTraits.filter(e => e.name === item.label)
                        obj.value += item.frequency/(filtered.length*100)
                    }else{
                        //label doesn't exist, create a new one
                        let obj = {"name": item.label, "value": item.frequency/(filtered.length*100)}
                        behavioralTraits.push(obj);
                    }
                })
            })
            console.log(behavioralTraits)
            setBehavioralTraits(behavioralTraits);
        });
    }

    const fetchEmotionalTraitsAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getEmotionalTraits(expertAiToken, item.content);
                resolve(result);
            });
        })
        Promise.all(requests).then((result) => {
            const filtered = result.filter(item => item.length > 0);
            let data = []; //use for pie chart
            filtered.map(items=>{
                //item is an array
                items.forEach(item=>{
                    // check if label already exists, if true, just add percentage to it
                    if(data.some(e => e.name === item.label)){
                        let obj = data.filter(e => e.name === item.label)
                        obj.value += item.frequency/(filtered.length*100)
                    }else{
                        //label doesn't exist, create a new one
                        let obj = {"name": item.label, "value": item.frequency/(filtered.length*100)}
                        data.push(obj);
                    }
                })
            })
            console.log(data)
            setEmotionalTraits(data);
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
         <p style={{ marginBottom: "0.2rem" }}>{loading?`Analyzing 30 news sources related to ${search.toUpperCase()} stock...`:
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
             const newsList = await getStockNews(search);
             setNews(newsList);
             fetchSentimentalAPI(newsList);
             fetchBehavioralTraitsAPI(newsList);
             fetchEmotionalTraitsAPI(newsList);
             setLoading(true);
         }}>Analyze</Button>}

         {/****************** RESULTS *************************/}
         {showResults?
         <div>
             <div style={{display:"flex", justifyContent:"center"}}>
             <OverallSentiment value={mean}/>
         <p style={{
            position: 'absolute',
            marginTop: "160px",
            fontSize:"22px"}}>{mean.toFixed(2)}</p>
         <p style={{
            position: 'absolute',
            fontSize:"24px"}}>Overall Sentiment</p>
                 </div>
         

            <div style={{display:"flex", flexWrap:"wrap"}}>
            <div style={{display:"flex"}}> 
            <p style={{
                marginTop: "-29px",
                marginRight:"-272px",
                fontSize:"22px"}}>Behavioral Traits</p>
                <BehaviouralTraits data={behavioralTraits}/>
                
                
            </div>
           <div style={{display:"flex"}}>
                <EmotionalTraits data={emotionalTraits}/>
                <p style={{
                marginTop: "-29px" ,
                marginLeft:"-272px",
                fontSize:"22px"}}>Emotional Traits</p>
           </div>
                </div>
           
         </div>
         
         :null}

         
       
    </div>

    );
}

export default Main;
