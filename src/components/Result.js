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
import {getExpertAiToken} from '../actions';

export default function Result({news, search, user}) {
    const [expertAiToken, setExpertAiToken] = useState("");
    const [sentimentResult, setSentimentResult] = useState([]);
    const [behaviouralTraitsResult, setBehaviouralTraitsResult] = useState([]);
    const [emotionalTraitsResult, setEmotionalTraitsResult] = useState([]);
    const [trendsResult, setTrendsResult] = useState([]);
    const [iptcResult, setIPTCResult] = useState([]);
    const [sentimentDisResult, setSentimentDistResult] = useState([]);
    const [peerCompResult, setPeerCompResult] = useState([]);
    const [articleBreakdownResult, setArticleBreakdownResult] = useState([]);


    const getAndSetExpertAiToken = async () => {
        setExpertAiToken(await getExpertAiToken());
    }

    useEffect(() => {
        getAndSetExpertAiToken();
        console.log(search)
    }, [])

    return(
        <Container>
        <Grid container spacing={5} justify="center">
           <Grid container justify="center" spacing={5}>
               <Grid item md={4} xs={6}>
                   <OverallSentiment newsList={news} token={expertAiToken} setSentimentResult={setSentimentResult}/>
               </Grid>
               <Grid item md={8} xs={12}>
                   <Trends stock={search} setTrendsResult={setTrendsResult}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px"}}>
               <Grid item sm={6} xs={12}>
                   <BehaviouralTraits newsList={news} token={expertAiToken} setBehaviouralTraitsResult={setBehaviouralTraitsResult}/>
               </Grid>
               <Grid item sm={6} xs={12}>
                   <EmotionalTraits newsList={news} token={expertAiToken} setEmotionalTraitsResult={setEmotionalTraitsResult}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px"}}>
               <Grid item md={6} xs={12}>
                   <IPTCTopics newsList={news} token={expertAiToken} setIPTCResult={setIPTCResult}/>
               </Grid>
               <Grid item md={6} xs={12}>
                   <SentimentHistogram newsList={news} token={expertAiToken} sentiment={sentimentResult} setSentimentDistResult={setSentimentDistResult}/>
               </Grid>
           </Grid>
           <Grid container justify="center" spacing={5} style={{marginTop:"22px", marginBottom: "40px"}}>
               <Grid item lg={5} xs={12}>
                   <PeerComparison stock={search} sentiment={sentimentResult} setPeerCompResult={setPeerCompResult}/>
               </Grid>
               <Grid item lg={7} xs={12}>
                   <ArticleBreakdown newsList={news} token={expertAiToken} sentiment={sentimentResult} setArticleBreakdownResult={setArticleBreakdownResult}/>
               </Grid>
           </Grid>           
       </Grid>
    </Container>
    )
}