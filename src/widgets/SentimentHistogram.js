import React, {useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import Loader from "../components/Loader";
import { COLORS } from "../utils";

export default function SentimentHistogram({ newsList, token, sentiment, setSentimentDistResult}){

    const [data, setData] = useState([]);

    const getMinAndMax = (sentiment)=> {
       let max = Math.max.apply(Math, sentiment.map(function(i) { return i.overall; }))
       let min = Math.min.apply(Math, sentiment.map(function(i) { return i.overall; }))
       //get highest whole number if positive number (i.e. 5.05 => 6)
       //get lowest whole number if negative number (i.e. -7.2 => -8)
       max>0? max = Math.ceil(max): max = Math.floor(max)
       min>0? min = Math.ceil(min): min = Math.floor(min)
       return {max, min};
    }

    const createHistogramData = (sentiment) =>{
        let {max, min} = getMinAndMax(sentiment)
        let binSize = 1;
        let data=[]; // for histogram

        // add frequency to each bin
        for (let i = min; i <= max; i=i+binSize){
            let items= sentiment.filter(item => 
                item.overall > i && item.overall < i+binSize
            )
            let obj = {
                'name': i,
                'value': items.length
            }
            data.push(obj)
        }   
        setData(data);
        setSentimentDistResult(data);
    }

    useEffect(() => {
        if (sentiment.length > 0) {
            createHistogramData(sentiment)
        }
    }, [newsList, sentiment])

    const CustomTooltip = ({ active, payload }) => {
        
        if (active && payload && payload.length) {
          return (
            <div style={{backgroundColor:"white", opacity:"0.8", borderRadius:"10px", padding:"0 0.6rem"}}>
              <p style={{fontSize:"15px", color:"black"}}>{`${payload[0].payload.name} to ${parseInt(payload[0].payload.name)+1} : ${(payload[0].value)}`}</p>
            </div>
          );
        }
      
        return null;
    };

    return(
        <div style={{backgroundColor:"#3e444f", borderRadius:"6px", paddingTop:"60px", paddingBottom:"20px", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
             <p style={{
                marginTop: "-29px" ,
                fontSize:"22px"}}>Sentimental Distribution
            </p>
            {data.length >0?
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="4 2" />
                <XAxis dataKey="name" tick={{fontSize: 12}} label={{value: 'Sentiment',position: 'insideBottom', offset:0 ,fontSize:"16px", fill:"white"}} />
                <YAxis tick={{fontSize: 12}}  label={{ value: 'Count', angle: -90, position: 'insideLeft', fontSize:"16px", fill:"white"}}/>
                <Tooltip content={CustomTooltip}/>
                <Bar dataKey="value" fill="#82ca9d">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart> :
            <div style={{height: "400px", marginTop: "50px"}}>
                <Loader/>
            </div>}
            
        </div>
    )
}