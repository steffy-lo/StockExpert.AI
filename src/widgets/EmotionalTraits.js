import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import '../App.css';
import {emotionalTraitsData} from "../mock_data";
import {getEmotionalTraits} from "../actions";
import { COLORS } from "../utils";


export default function EmotionalTraits({newsList, token}){

    const [emotionalTraits, setEmotionalTraits] = useState([]);

    const fetchEmotionalTraitsAPI = async (news) =>{
        let requests = news.map((item) => {
            return new Promise((resolve) => {
                let result = getEmotionalTraits(token, item.content);
                resolve(result);
            });
        })
        Promise.all(requests).then((result) => {
            const filtered = result.filter(item => item.length > 0);
            let emotionalTraits = []; //use for pie chart
            filtered.map(items=>{
                //item is an array
                items.forEach(item=>{
                    // check if label already exists, if true, just add percentage to it
                    if(emotionalTraits.some(e => e.name === item.label)){
                        let obj = emotionalTraits.filter(e => e.name === item.label)
                        obj.value += item.frequency/(filtered.length*100)
                    }else{
                        //label doesn't exist, create a new one
                        let obj = {"name": item.label, "value": item.frequency/(filtered.length*100)}
                        emotionalTraits.push(obj);
                    }
                })
            })
            console.log(emotionalTraits)
            setEmotionalTraits(emotionalTraits);
        });
    }

    useEffect(() => {
        setEmotionalTraits(emotionalTraitsData);
        // fetchEmotionalTraitsAPI(newsList);
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
            <PieChart width={400} height={200}>
                <Pie
                    dataKey="value"
                    data={emotionalTraits}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    fill="#8884d8"
                    labelLine={false}
                >
                    {emotionalTraits.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="vertical" verticalAlign="middle" content={renderLegend}/>
            </PieChart>
            <p style={{
                marginTop: "-29px" ,
                marginLeft:"-272px",
                fontSize:"22px"}}>Emotional Traits
            </p>
        </div>
      );
}