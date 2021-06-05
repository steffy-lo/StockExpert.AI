import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import '../App.css';
import {getBehavioralTraits} from "../actions";
import {behaviouralTraitsData} from "../mock_data";
import { COLORS } from "../utils";

export default function BehaviouralTraits({newsList, token}) {

    const [behavioralTraits, setBehavioralTraits] = useState([]);

    const fetchBehavioralTraitsAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getBehavioralTraits(token, item.content);
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

    useEffect(() => {
        setBehavioralTraits(behaviouralTraitsData);
        // fetchBehavioralTraitsAPI(newsList);
    }, [newsList])

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div style={{backgroundColor:"white", opacity:"0.8", borderRadius:"10px", padding:"0 0.6rem"}}>
              <p style={{fontSize:"15px", color:"black"}} className="label">{`${payload[0].name} : ${(payload[0].value* 100).toFixed(0)}%`}</p>
            </div>
          );
        }
      
        return null;
    };

    const renderLegend = (props) => {
        const { payload } = props;
        console.log(payload)
      
        return (
          <ul style={{margin:0, textAlign:"left"}}>
            {
              payload.map((entry, index) => (
                <li style={{fontSize:"15px", color:`${entry.color}`}} key={`item-${index}`}>{entry.value}</li>
              ))
            }
          </ul>
        );
      }

    return (
        <div style={{ display: "flex"}}>
            <p style={{
                marginTop: "-29px",
                marginRight:"-272px",
                fontSize:"22px"}}>Behavioral Traits
            </p>
            <PieChart width={400} height={200}>
                <Pie
                    dataKey="value"
                    data={behavioralTraits}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    fill="#8884d8"
                    labelLine={false}
                >
                    {behavioralTraits.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="vertical" verticalAlign="middle" content={renderLegend}/>
            </PieChart>
        </div>
      );
}