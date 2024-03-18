/* eslint-disable @typescript-eslint/no-explicit-any */
import CanvasJSReact from "@canvasjs/react-charts";
import { useRef, useState } from "react";
import { TCanvasJsOptions } from "./sharedComponents/useCanvasjsConfig";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type THasOrNotHasPieGraphProps = {
    chartType: string;
  filteredData: any[];
  defaultCanvasjsOptions: TCanvasJsOptions;
};

const HasOrNotHasPieGraph = ({ chartType,filteredData ,defaultCanvasjsOptions}: THasOrNotHasPieGraphProps) => {
  console.log(filteredData);
  
  

  const options = {
    // animationEnabled: true,
    backgroundColor: "transparent",
    colorSet: "colorSet1", 
    ...defaultCanvasjsOptions,
    data: [
      {
        type: chartType,  // "pie"
        indexLabelFontSize: 14,
        indexLabelFontFamily: "Arial",
        indexLabelFontColor: "#333",
        indexLabelLineColor: "#333",
        indexLabelPlacement: "inside", // "inside", "outside"
        indexLabel: "{label} {y}", // "{label}: {y}%" to display percentages
        showInLegend: true,
        startAngle: 240,
        toolTipContent: "{label}: {y}%",
        dataPoints: [
          { y: 79.45, label: "Google" },
          { y: 7.31, label: "Bing" },
          { y: 7.06, label: "Baidu" },
          { y: 4.91, label: "Yahoo" },
          { y: 1.26, label: "Others" },
        ],
      },
    ],
  };

  return (
    <div>
      <h4>Child Sub Title</h4>
      <div id="canvajsChart">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default HasOrNotHasPieGraph;
