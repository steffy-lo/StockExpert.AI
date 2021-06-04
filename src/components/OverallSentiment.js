import React, { useRef, useLayoutEffect } from 'react';   
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function OverallSentiment({value}) {
    const chart = useRef(null);

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
      hand.value = value; //get value from props
      hand.pin.disabled = true;
      hand.fill = am4core.color("#FFF");
      hand.stroke = am4core.color("#FFF");
      hand.innerRadius = am4core.percent(80);
      hand.radius = am4core.percent(92);
      hand.startWidth = 15;

      // Animate
      setTimeout(function() {
        hand.showValue(value, am4core.ease.cubicOut);
      }, 2000);

      chart.current = x;
  
      return () => {
        x.dispose();
      };
    }, []);

    return (
        <div id="chartdiv" style={{ width: "400px", height: "280px", marginTop:"70px"}}></div>
      );
}