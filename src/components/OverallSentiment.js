import React, { useRef, useLayoutEffect } from 'react';   
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function OverallSentiment() {
    const chart = useRef(null);

    useLayoutEffect(() => {
      let x = am4core.create("chartdiv", am4charts.XYChart);
  
      // ...
      chart.current = x;
  
      return () => {
        x.dispose();
      };
    }, []);

    return (
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      );
}