import {Grid, Container} from '@material-ui/core';
import OverallSentiment from '../widgets/OverallSentiment';
import BehaviouralTraits from '../widgets/BehaviouralTraits';
import EmotionalTraits from '../widgets/EmotionalTraits';
import ArticleBreakdown from "../widgets/ArticleBreakdown";
import IPTCTopics from "../widgets/IPTCTopics";
import PeerComparison from "../widgets/PeerComparison";
import SentimentHistogram from "../widgets/SentimentHistogram";
import Trends from "../widgets/Trends";
import React, {useEffect, useState} from 'react';
import {getExpertAiToken, getStockQuote} from '../actions';
import { addToUserHistory, updateUser } from '../actions/service';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Result({news, search, user, setUser, history}) {
    const [expertAiToken, setExpertAiToken] = useState("");
    const [sentimentResult, setSentimentResult] = useState([]);
    const [behaviouralTraitsResult, setBehaviouralTraitsResult] = useState([]);
    const [emotionalTraitsResult, setEmotionalTraitsResult] = useState([]);
    const [trendsResult, setTrendsResult] = useState([]);
    const [iptcResult, setIPTCResult] = useState([]);
    const [peerCompResult, setPeerCompResult] = useState([]);
    const [articleBreakdownResult, setArticleBreakdownResult] = useState([]);
    const [stockSchema, setStockSchema] = useState({});

    const getAndSetPromises = async () => {
        await setExpertAiToken(await getExpertAiToken());
        let quote  = await getStockQuote(search.toUpperCase());
        delete quote.t; //remove 't' property
        quote.symbol = search.toUpperCase(); //add symbol property
        setStockSchema(quote);
    }

    useEffect(() => {
        getAndSetPromises();
    }, [])

    useEffect(async ()=> {
        //if user is signed in, add to History
        if (history === undefined && !!user && Object.keys(stockSchema).length > 0 && articleBreakdownResult.length > 0 && behaviouralTraitsResult.length > 0
        && emotionalTraitsResult.length > 0 && iptcResult.length > 0 && peerCompResult.length > 0 && sentimentResult.length > 0 && trendsResult.length > 0) {
            const resultData = {
                stock: stockSchema,
                articles: news,
                articleBreakdown: articleBreakdownResult,
                behaviouralTraits: behaviouralTraitsResult,
                emotionalTraits: emotionalTraitsResult,
                IPTCTopics: iptcResult,
                peerSentiment: peerCompResult,
                sentiment: sentimentResult,
                trends: trendsResult
            }
            console.log(resultData)
            console.log("Pushed to History!")
            let res = await addToUserHistory(resultData, user.username);
            setUser({...user, ...res});
        }
    }, [stockSchema, news, articleBreakdownResult, behaviouralTraitsResult, emotionalTraitsResult, iptcResult,peerCompResult, sentimentResult, trendsResult])

    return expertAiToken && (
        <Container style={{ marginTop: "25px"}}>
        <Grid container spacing={5} justify="center">
            {!!user &&
            <div style={{ fontSize: "18px", display: "flex", alignItems: "center"}}>
                <p style={{ marginRight: "5px"}}>Add to Watchlist</p>
                {user.watchlist.map(stock => stock.symbol).includes(search) ?
                    <StarIcon style={{ color: "#ffc107",  cursor: "pointer"}} onClick={async () => {
                        const updatedUser = await updateUser({
                            username: user.username,
                            watchlist: user.watchlist.filter(function(stock, index, arr){
                                return stock.symbol !== search;
                            }),
                            history: user.history
                        })
                        await setUser({...user, ...updatedUser})
                        console.log(updatedUser)
                    }}/> :
                    <StarBorderIcon style={{ color: "#ffc107", cursor: "pointer"}} onClick={async () => {
                        if (stockSchema) {
                            const updatedUser = await updateUser({
                                username: user.username,
                                watchlist: [...user.watchlist, stockSchema],
                                history: user.history
                            })
                            await setUser({...user, ...updatedUser})
                            console.log(updatedUser)
                        }
                    }}/>}
            </div>}
           <Grid container justify="center" spacing={5}>
               <Grid item md={4} xs={6}>
                   <OverallSentiment newsList={news} token={expertAiToken} setSentimentResult={setSentimentResult} user={user} historyIndex={history}/>
               </Grid>
               <Grid item md={8} xs={12}>
                   <Trends stock={search} setTrendsResult={setTrendsResult} user={user} historyIndex={history}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px"}} >
               <Grid item sm={6} xs={12}>
                   <BehaviouralTraits newsList={news} token={expertAiToken} setBehaviouralTraitsResult={setBehaviouralTraitsResult} user={user} historyIndex={history}/>
               </Grid>
               <Grid item sm={6} xs={12}>
                   <EmotionalTraits newsList={news} token={expertAiToken} setEmotionalTraitsResult={setEmotionalTraitsResult} user={user} historyIndex={history}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px"}} user={user} historyIndex={history}>
               <Grid item md={6} xs={12}>
                   <IPTCTopics newsList={news} token={expertAiToken} setIPTCResult={setIPTCResult} user={user} historyIndex={history}/>
               </Grid>
               <Grid item md={6} xs={12}>
                   <SentimentHistogram newsList={news} sentiment={sentimentResult}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px", marginBottom: "40px"}}>
               <Grid item lg={5} xs={12}>
                   <PeerComparison stock={search} sentiment={sentimentResult} setPeerCompResult={setPeerCompResult} user={user} historyIndex={history}/>
               </Grid>
               <Grid item lg={7} xs={12}>
                   <ArticleBreakdown newsList={news} token={expertAiToken} sentiment={sentimentResult} setArticleBreakdownResult={setArticleBreakdownResult} user={user} historyIndex={history}/>
               </Grid>
           </Grid>           
       </Grid>
    </Container>
    )
}