import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {getSentimentAnalysis} from "../actions";
import Loader from "../components/Loader";
import {sentimentData} from "../mock_data";

am4core.useTheme(am4themes_animated);

export default function OverallSentiment({newsList, token, setSentimentResult, user, historyIndex}) {
    const chart = useRef(null);
    const [mean, setMean] = useState();

    const calculateMean = (result) =>{
      let sum = result.reduce((acc,currentValue)=>{
        return acc + currentValue.overall;
      },0)
      setMean(sum/15);
    }

    const calculateMedian = (result) =>{
      result.sort((a, b) => (a.overall > b.overall) ? 1 : -1)
    }

    const fetchSentimentalAPI = async () =>{
      let requests = newsList.map((item) => {
        return new Promise((resolve) => {
          let result = getSentimentAnalysis(token, item.content);
          resolve(result);
        });
      })
      Promise.all(requests).then((result) => {
        calculateMean(result);
        calculateMedian(result);
        const filteredSentiment = result.map(({overall, negativity, positivity }) => ({
          overall, negativity, positivity
        }));
        setSentimentResult(filteredSentiment);
      });
    }

    useEffect(() => {
        if (historyIndex === undefined) {
            fetchSentimentalAPI(newsList);
        } else {
            const result = user.history[historyIndex].sentiment
            calculateMean(result)
            setSentimentResult(result)
        }
        // setMean(5.5);
        // setSentimentResult(sentimentData);
    }, [newsList])

    useLayoutEffect(() => {
      let x = am4core.create("chartdiv", am4charts.GaugeChart);
  
      let axis = x.xAxes.push(new am4charts.ValueAxis()); 
      axis.min = -100;
      axis.max = 100;
      axis.strictMinMax = true;
      x.innerRadius = -20;
      x.startAngle = -120;
      x.endAngle = -60;
      axis.renderer.minGridDistance = 300;
      axis.renderer.labels.template.fill = am4core.color("#FFF");
      axis.renderer.labels.template.fontSize = 15; 

      let range = axis.axisRanges.create();//negative values
      range.value = -100;
      range.endValue = 0;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#6aa5fc");
      range.axisFill.zIndex = -1;

      let range1 = axis.axisRanges.create();//positive values
      range1.value = 0;
      range1.endValue = 100;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = am4core.color("#7469ff");
      range1.axisFill.zIndex = -1;

      let hand = x.hands.push(new am4charts.ClockHand());
      hand.value = mean; //get value from props
      hand.pin.disabled = true;
      hand.fill = am4core.color("#FFF");
      hand.stroke = am4core.color("#FFF");
      hand.innerRadius = am4core.percent(80);
      hand.radius = am4core.percent(92);
      hand.startWidth = 15;

      // Animate
      setTimeout(function() {
        hand.showValue(mean, am4core.ease.cubicOut);
      }, 2000);

      chart.current = x;
  
      return () => {
        x.dispose();
      };
    }, [mean]);


    if (mean) {
      return (
          <div style={{display:"flex", flexDirection:"column"}}>
            <div id="chartdiv" style={{backgroundColor:"#3e444f",width: "400px", height: "270px", paddingTop: "113px", borderRadius:"6px"}}/>
            <p style={{
              position: 'absolute',
              marginTop: "200px",
              marginLeft: "175px",
              fontSize:"26px"}}>{mean.toFixed(2)}</p>
            <p style={{
              position: 'absolute',
              fontSize:"24px",
              marginLeft: "100px",
              marginTop: "60px"}}>Overall Sentiment</p>
          </div>
      );
    } else {
      return (
          <div style={{height: "400px", marginTop: "70px"}}>
            <Loader/>
          </div>
      )
    }
}