import React, {useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import '../App.css';
import { getIPTCTopics } from "../actions";
import { IPTCData } from "../mock_data";
import { COLORS } from "../utils";

export default function IPTCTopics({newsList, token, setIPTCResult, user, historyIndex}) {
const [IPTCTopics, setIPTCTopics] = useState([]);

    const fetchIPTCTopicsAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getIPTCTopics(token, item.content);
                resolve(result);
            });
        })
        Promise.all(requests).then((result) => {
            const filtered = result.filter(item => item != undefined);
            let IPTCData = []; //use for bar chart
            filtered.map(items=>{
                //item is an array
                items.forEach(item=>{
                    // check if label already exists, if true, just add percentage to it
                    if(IPTCData.some(e => e.name === item.label)){
                        let obj = IPTCData.filter(e => e.name === item.label)
                        obj.value += item.frequency/(filtered.length*100)
                    }else{
                        //label doesn't exist, create a new one
                        let obj = {"name": item.label, "value": item.frequency/(filtered.length*100)}
                        IPTCData.push(obj);
                    }
                })
            })
            setIPTCTopics(IPTCData);
            setIPTCResult(IPTCData);
            
        });
    }

    useEffect(() => {
        if (historyIndex === undefined) {
            fetchIPTCTopicsAPI(newsList);
            // setIPTCTopics(IPTCData);
            // setIPTCResult(IPTCData);
        } else {
            setIPTCTopics(user.history[historyIndex].IPTCTopics)
            setIPTCResult(user.history[historyIndex].IPTCTopics)
        }
    }, [newsList])

    const CustomTooltip = ({ active, payload }) => {
        
        if (active && payload && payload.length) {
          return (
            <div style={{backgroundColor:"white", opacity:"0.8", borderRadius:"10px", padding:"0 0.6rem"}}>
              <p style={{fontSize:"15px", color:"black"}} className="label">{`${payload[0].payload.name} : ${(payload[0].value* 100).toFixed(0)}%`}</p>
            </div>
          );
        }
      
        return null;
    };

    return (
        <div style={{ backgroundColor:"#3e444f", borderRadius:"6px", padding:"20px",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p style={{
                fontSize:"22px"}}>IPTC Media Topics
            </p>
            <BarChart
                width={500}
                height={300}
                data={IPTCTopics}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="4 2" />
                <XAxis dataKey="name" tick={{fontSize: 12}} label={{value: 'Categories',position: 'insideBottom', offset:0 ,fontSize:"16px", fill:"white"}} />
                <YAxis tick={{fontSize: 12}} label={{ value: 'Frequency (%)', angle: -90, position: 'insideLeft', fontSize:"16px", fill:"white"}} />
                <Tooltip content={CustomTooltip}/>
                <Bar dataKey="value" fill="#82ca9d">
                    {IPTCTopics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
            
        </div>
      );
}