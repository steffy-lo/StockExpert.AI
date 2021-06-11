import React from "react";
import { LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {getRecommendationTrends} from "../actions";

function Trends({stock}) {

    const [recommendations, setRecommendations] = React.useState([]);

    const getTrends = async () => {
        const trendResult = await getRecommendationTrends(stock);
        setRecommendations(trendResult.reverse());
    }

    React.useEffect(() => {
        getTrends()
    }, [stock])

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{backgroundColor:"white", opacity:"0.8", borderRadius:"10px", padding:"1rem"}}>
                    <p style={{fontSize:"15px", color:"black"}} className="label">{payload[0].payload.period}</p>
                    <p style={{fontSize:"15px", color:"#26a642"}} className="label">{`Strong Buy : ${(payload[0].payload.strongBuy)}`}</p>
                    <p style={{fontSize:"15px", color:"#00C49F"}} className="label">{`Buy : ${(payload[0].payload.buy)}`}</p>
                    <p style={{fontSize:"15px", color:"#FFBB28"}} className="label">{`Hold : ${(payload[0].payload.hold)}`}</p>
                    <p style={{fontSize:"15px", color:"#1b5efa"}} className="label">{`Sell : ${(payload[0].payload.sell)}`}</p>
                    <p style={{fontSize:"15px", color:"#3c31d4"}} className="label">{`Strong Sell : ${(payload[0].payload.strongSell)}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ backgroundColor:"#3e444f", borderRadius:"6px", paddingTop:"10px", paddingBottom: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p style={{
                fontSize:"22px"}}>Recommendation Trends
            </p>
            <LineChart
                width={770}
                height={300}
                data={recommendations}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="4 2" />
                <XAxis dataKey="period" tick={{fontSize: 12}} label={{value: 'Period', position: 'insideBottom', offset: 0 ,fontSize:"16px", fill:"white"}}/>
                <YAxis tick={{fontSize: 12}} label={{ value: 'Count', angle: -90, position: 'insideLeft', fontSize:"16px", fill:"white"}}/>
                <Tooltip content={CustomTooltip}/>
                <Line type="monotone" dataKey="hold" stroke="#FFBB28"/>
                <Line type="monotone" dataKey="buy" stroke="#00C49F"/>
                <Line type="monotone" dataKey="sell" stroke="#1b5efa"/>
                <Line type="monotone" dataKey="strongBuy" stroke="#26a642"/>
                <Line type="monotone" dataKey="strongSell" stroke="#3c31d4"/>
            </LineChart>
        </div>
    );
}

export default Trends;
