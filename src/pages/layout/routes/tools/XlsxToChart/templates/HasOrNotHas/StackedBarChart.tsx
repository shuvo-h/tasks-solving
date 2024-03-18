import  { useRef, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import TitleConfigurator from "../sharedComponents/TitleConstructor";
import AxisConfigurator from "../sharedComponents/AxisConfigurator";
import useCanvasjsConfig from "../sharedComponents/useCanvasjsConfig";
import LegendConfigurator from "../sharedComponents/LegendConfigurator";
import IndexLabelConfigurator from "../sharedComponents/IndexLabelConfigurator";
import CustomConfigurator from "../sharedComponents/CustomConfigurator";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type TStackedBarChartprops = {
  chartType: string;
  data: {
    groupBy: string;
    key: string;
    hasCount: number;
    notHasCount: number;
  }[];
};

const StackedBarChart = ({ chartType, data }: TStackedBarChartprops) => {
  
  const suffixShown = () => {
    switch (chartType) {
      case "stackedBar100":
      case "stackedColumn100":
        return "%";

      default:
        return "";
    }
  };
  const {yAxisConfigure,setYAxisConfigure,xAxisConfigure,setXAxisConfigure, legendConfigure,setLegendConfigure, titleConfig,setTitleConfig, indexLabelConfig:indexLabelConfigHas,setIndexLabelConfig:setIndexLabelConfigHas} = useCanvasjsConfig({suffixShown})
  const {indexLabelConfig:indexLabelConfigHasNot,setIndexLabelConfig:setIndexLabelConfigHasNot} = useCanvasjsConfig({suffixShown})
  const [customConfig,setCustomConfig] = useState({
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    height:860,  
    width: 1300,
  })
  
  

  const formattedData = () => {
    switch (chartType) {
      case "stackedBar100":
      case "stackedColumn100":
        return data.map((el) => ({
          ...el,
          yHasValue: (el.hasCount / (el.hasCount + el.notHasCount)) * 100,
          yNotHasValue: (el.notHasCount / (el.hasCount + el.notHasCount)) * 100,
        }));

      default:
        return data.map((el) => ({
          ...el,
          yHasValue: el.hasCount,
          yNotHasValue: el.notHasCount,
        }));
    }
  };
  
  const formatYvalueString = () => {
    switch (chartType) {
      case "stackedBar100":
      case "stackedColumn100":
        return "#,###'%'";
      case "bar":
        console.log("op");

        return "#,##0";
      default:
        return "#,##0";
    }
  };
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const updateChartDimensions = () => {
    if (chartContainerRef.current && chartContainerRef.current.firstChild) {
      const firstChild = chartContainerRef.current.firstChild as HTMLElement;
      firstChild.style.width = `${customConfig.width}px`;
      firstChild.style.height = `${customConfig.height}px`;
    }
  };
  updateChartDimensions();

  const options = {
    theme: customConfig.theme, // "light1", "light2", "dark1", "dark2"
    height: customConfig.height||1,  
    width: customConfig.width || 1,
    animationEnabled: true,
    exportEnabled: true,
    title: titleConfig,
    axisX: xAxisConfigure,
    axisY: yAxisConfigure,
    legend: legendConfigure,
    toolTip: {
      shared: true,
      reversed: true,
    },
    data: [
      {
        type: chartType,
        name: "Has Col",
        showInLegend: true,
        //   indexLabel: "{label} - {y}",
        yValueFormatString: formatYvalueString(),
        dataPoints: formattedData().map((item) => ({
          label: item.groupBy,
          y: item.yHasValue,
        })),
        ...indexLabelConfigHas,
      },
      {
        type: chartType,
        name: "NoHas Col",
        showInLegend: true,
        yValueFormatString: formatYvalueString(),
        dataPoints: formattedData().map((item) => ({
          label: item.groupBy,
          y: item.yNotHasValue,
        })),
        legendText: "NotHas",
        ...indexLabelConfigHasNot,
      },
    ],
    
  };


  
  return (
    <div>
      <div>
        <TitleConfigurator
          setTitleOptions={setTitleConfig}
          titleOptions={titleConfig}
        />
      </div>
      <div>
          <h4>Custom Configure</h4>
          <CustomConfigurator customConfig={customConfig} setCustomConfig={setCustomConfig} />
        </div>
      <div ref={chartContainerRef} id="myChart">
        <CanvasJSChart options={options}  />
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <h4>Y axis Configuration</h4>
          <AxisConfigurator axisConfig={yAxisConfigure} setAxisConfig={setYAxisConfigure} />
        </div>
        <div>
          <h4>X axis Configuration</h4>
          <AxisConfigurator axisConfig={xAxisConfigure} setAxisConfig={setXAxisConfigure} />
        </div>
        <div>
          <h4>Legend Configuration</h4>
          <LegendConfigurator legendConfigure={legendConfigure} setLegendConfigure={setLegendConfigure} />
        </div>
        <div>
          <h4>Index Label Configure (Has)</h4>
          <IndexLabelConfigurator indexLabelConfig={indexLabelConfigHas}  setIndexLabelConfig={setIndexLabelConfigHas} />
        </div>
        <div>
          <h4>Index Label Configure (HasNot)</h4>
          <IndexLabelConfigurator indexLabelConfig={indexLabelConfigHasNot}  setIndexLabelConfig={setIndexLabelConfigHasNot} />
        </div>
        
      </div>
    </div>
  );
};

export default StackedBarChart;



