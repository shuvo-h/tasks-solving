/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { useEffect, useState } from "react";
import { TCanvasJsOptions, TIndexLabelConfig } from "./sharedComponents/useCanvasjsConfig";
import { graphDataFormatter } from "../xlsxToCharUtils";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type THasOrNotHasPieGraphProps = {
    chartType: string;
  filteredData: any[];
  defaultCanvasjsOptions: TCanvasJsOptions;
  setTotalDataSet: React.Dispatch<React.SetStateAction<number>>,
  hasOrNotHasBy: string,
  indexLabelConfigs: TIndexLabelConfig[]
};

const HasOrNotHasPieGraph = ({ chartType,filteredData,hasOrNotHasBy,defaultCanvasjsOptions,setTotalDataSet,indexLabelConfigs}: THasOrNotHasPieGraphProps) => {
  console.log(filteredData);
  const [showType,setShowType] = useState(chartType);
  const pieData = graphDataFormatter.hasAndNotHasWithoutGroup(filteredData,hasOrNotHasBy)
  console.dir({pieData});
  
  useEffect(()=>{
    setTotalDataSet(3);
  },[])

  // write a helper method to return has or no has for total data

  const options = {
    // animationEnabled: true,
    // backgroundColor: "transparent",
    // colorSet: "colorSet1", 
    ...defaultCanvasjsOptions,
    data: [
      {
        // type: chartType,  // "pie"
        type: showType,  // "pie"
        // indexLabelFontSize: 14,
        // indexLabelFontFamily: "Arial",
        // indexLabelFontColor: "#333",
        // indexLabelLineColor: "#333",
        // indexLabelPlacement: "inside", // "inside", "outside"
        // indexLabel: "{label} {y}", // "{label}: {y}%" to display percentages
        // showInLegend: true,
        // startAngle: 240,
        // toolTipContent: "{label}: {y}%",
        ...indexLabelConfigs[3],
        dataPoints: [
          // { y: 79.45, label: "Google" },
          // { y: 7.31, label: "Bing" },
          { y: pieData.hasCount, label: `With ${pieData.key}`,...indexLabelConfigs[0], },
          { y: pieData.notHasCount, label: `Without ${pieData.key}`,...indexLabelConfigs[1], },
        ],
      },
    ],
  };
  console.log(showType);
  
  
  return (
    <div>
      <h4>Child Sub Title</h4>
      <div>
        <h4>Show Type</h4>
        <select onChange={e=>setShowType(e.target.value)} name="" id="">
          <option value="pie">Pie Chart </option>
          <option value="bar">Bar Chart Horizontal</option>
          <option value="column">Bar Chart Vertical</option>
        </select>
      </div>
      <div id="canvajsChart">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default HasOrNotHasPieGraph;
