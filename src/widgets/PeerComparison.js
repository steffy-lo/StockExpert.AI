import React from "react";
import {getNewsSentiment, getPeerCompanies} from "../actions";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {peerSentiment} from "../mock_data";

function PeerComparison({stock, sentiment, setPeerCompResult, user, historyIndex}) {

    const [stocks, setStocks] = React.useState([]);
    const [sentimentList, setSentimentList] = React.useState([]);

    const getPeers = async () => {
        const peerStocks = await getPeerCompanies(stock.toUpperCase());
        setStocks([stock.toUpperCase(), ...peerStocks])
    }

    const getStockSentiment = async () => {
        let positivityMean = sentiment.reduce((acc, currentValue)=>{
            return acc + currentValue.positivity;
        }, 0) / 15;
        let negativityMean = sentiment.reduce((acc, currentValue)=>{
            return acc + currentValue.negativity;
        }, 0) / 15;

        let unitPercentNeg = 1;
        let unitPercentPos = 1;
        const stockSentimentList = [];
        for (let i = 0; i < stocks.length; i++) {
            const res = await getNewsSentiment(stocks[i]);
            if (res.sentiment) {
                if (i === 0) { // benchmark stock
                    unitPercentNeg = negativityMean / res.sentiment.bearishPercent
                    unitPercentPos = positivityMean / res.sentiment.bullishPercent

                    let sectorNegativity = (1 - res.sectorAverageBullishPercent) * unitPercentNeg;
                    let sectorPositivity = res.sectorAverageBullishPercent * unitPercentPos
                    stockSentimentList.push({ // sector info
                        symbol: "Sector",
                        negativity: sectorNegativity,
                        positivity: sectorPositivity,
                        overall: sectorNegativity + sectorPositivity
                    })
                }
                res.negativity = res.sentiment.bearishPercent * unitPercentNeg
                res.positivity = res.sentiment.bullishPercent * unitPercentPos
                res.overall = res.negativity + res.positivity
                stockSentimentList.push(res)
            }
        }
        setSentimentList(stockSentimentList);
        setPeerCompResult(stockSentimentList);
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{backgroundColor:"white", opacity:"0.8", borderRadius:"10px", padding:"1rem"}}>
                    <p style={{fontSize:"15px", color:"black"}} className="label">{payload[0].payload.symbol}</p>
                    <p style={{fontSize:"15px", color:"#FFBB28"}} className="label">{`Overall : ${(payload[0].payload.overall).toFixed(1)}`}</p>
                    <p style={{fontSize:"15px", color:"#00C49F"}} className="label">{`Positivity : ${(payload[0].payload.positivity).toFixed(1)}`}</p>
                    <p style={{fontSize:"15px", color:"#7469ff"}} className="label">{`Negativity : ${(payload[0].payload.negativity).toFixed(1)}`}</p>
                </div>
            );
        }

        return null;
    };

    React.useEffect(() => {
        if (historyIndex === undefined) {
            getPeers()
        }
    }, [stock])

    React.useEffect(() => {
        if (historyIndex === undefined) {
            getStockSentiment()
            // setSentimentList(peerSentiment)
            // setPeerCompResult(peerSentiment)
        } else {
            setSentimentList(user.history[historyIndex].peerSentiment)
            setPeerCompResult(user.history[historyIndex].peerSentiment)
        }
    }, [stocks, sentiment])

    return (
        <div style={{ backgroundColor:"#3e444f", borderRadius:"6px", paddingTop:"10px", paddingBottom: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop:"30px"}}>
            <p style={{
                fontSize:"22px"}}>Peer & Sector Comparison
            </p>
            <BarChart
                width={500}
                height={300}
                data={sentimentList}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="4 2" />
                <XAxis dataKey="symbol" tick={{fontSize: 12}} label={{value: 'Companies', position: 'insideBottom', offset:-1, fontSize:"16px", fill:"white"}} />
                <YAxis tick={{fontSize: 12}} label={{value: 'Sentiment', angle: -90, position: 'insideLeft', fontSize:"16px", fill:"white"}}/>
                <Tooltip content={CustomTooltip}/>
                <Bar dataKey="overall" fill="#FFBB28"/>
                <Bar dataKey="positivity" fill="#00C49F"/>
                <Bar dataKey="negativity" fill="#7469ff"/>
            </BarChart>
        </div>
    );
}

export default PeerComparison;
