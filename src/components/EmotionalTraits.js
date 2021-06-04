import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import '../App.css';

export default function EmotionalTraits({data}){
    const COLORS = ['#3c31d4','#653cfa','#9188fc','#1b5efa','#0088FE', '#52aeff','#00C49F','#26a642','#72d932', '#fffb14','#FFBB28', '#FF8042','#cc3535','#e848a5','#fa9cff'];

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

          <PieChart width={400} height={200}>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              fill="#8884d8"
              labelLine={false}
            >
                {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="vertical" verticalAlign="middle" content={renderLegend}/>

          </PieChart>
      );
}