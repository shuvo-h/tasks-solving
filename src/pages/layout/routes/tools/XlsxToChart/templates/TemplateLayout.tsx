/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { graphDataFormatter } from "../xlsxToCharUtils";
import StackedBarChart from "./HasOrNotHas/StackedBarChart";
import "./template.css";
import GraphViewerLayout from "./GraphViewerLayout";
import { TAxiosConfig, TCustomConfig, TLegendConfigure, TTitleConfig } from "./sharedComponents/useCanvasjsConfig";
import { TEMPLATES, TTemplate } from "../GraphTemplates";

type TTemplateLayoutProps = {
  template: TTemplate;
  filteredData: any[];
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
  primaryColumn: string;
  children: ReactNode;
  yAxisConfigure: TAxiosConfig,
  setYAxisConfigure: React.Dispatch<React.SetStateAction<TAxiosConfig>>,
  xAxisConfigure: TAxiosConfig,
  setXAxisConfigure:React.Dispatch<React.SetStateAction<TAxiosConfig>>,
  legendConfigure: TLegendConfigure,
  setLegendConfigure: React.Dispatch<React.SetStateAction<TLegendConfigure>>,
  titleConfig: TTitleConfig,
  setTitleConfig: React.Dispatch<React.SetStateAction<TTitleConfig>>,
  // indexLabelConfig: TIndexLabelConfig,
  // setIndexLabelConfig:React.Dispatch<React.SetStateAction<TIndexLabelConfig>>,
  customConfig: TCustomConfig,
  setCustomConfig:React.Dispatch<React.SetStateAction<TCustomConfig>>
};
const hasOrNotBarChart_chartTypes = [ 
    'stackedBar100', 
    'stackedColumn100', 
    'stackedBar',
    'stackedColumn', 
    'bar',
    'line', 
    // 'pie', 
    // 'doughnut', 
];
const hasOrNotPieChart_chartTypes = [ 
    'pie', 
    // 'doughnut', 
];

const TemplateLayout = ({ 
  template,
  filteredData,
  primaryColumn ,
  chartType,
  setChartType,
  children,
  yAxisConfigure,
  setYAxisConfigure,
  xAxisConfigure,
  setXAxisConfigure,
  legendConfigure,
  setLegendConfigure,
  titleConfig,
  setTitleConfig,
  // indexLabelConfig,
  // setIndexLabelConfig, 
  customConfig,
  setCustomConfig}: TTemplateLayoutProps) => {
  const [activeBar, setActiveBar] = useState("Group By");
  const [chartTypes, setChartTypes] = useState<string[]>([]);
  // const [chartType, setChartType] = useState('stackedBar');
  const [groupBy, setGroupBy] = useState(primaryColumn);
  const [hasOrNotHasBy, setHasOrNotHasBy] = useState("");
  const hsData = graphDataFormatter.hasAndNotHas(
    filteredData,
    groupBy,
    hasOrNotHasBy
  );
  const suffixShown = () => {
    switch (chartType) {
      case "stackedBar100":
      case "stackedColumn100":
        return "%";

      default:
        return "";
    }
  };

  const generateChartTypeBySelectedTemplate = () =>{
    switch (template) {
      case TEMPLATES.hasOrNotBarChart:
        setChartTypes(hasOrNotBarChart_chartTypes);
        break;
      case TEMPLATES.hasOrNotPieChart:
        setChartTypes(hasOrNotPieChart_chartTypes);
        break;
    
      default:
        break;
    }
  }
  useEffect(()=>{
    generateChartTypeBySelectedTemplate();
  },[template,])

  const columns = filteredData.length
    ? Object.keys(filteredData[0]).filter((nameEl) => nameEl.length)
    : [];
  console.log(hsData);

  return (
    <section  className="hasOrNoHasPage_container">
      <aside>
        <h2 style={{textAlign:"center"}}>Graph Viewer</h2>
        <GraphViewerLayout 
          customConfig={customConfig}
          legendConfigure={legendConfigure}
          setCustomConfig={setCustomConfig}
          setLegendConfigure={setLegendConfigure}
          setTitleConfig={setTitleConfig}
          setXAxisConfigure={setXAxisConfigure}
          setYAxisConfigure={setYAxisConfigure}
          titleConfig={titleConfig}
          xAxisConfigure={xAxisConfigure}
          yAxisConfigure={yAxisConfigure}
        >
          {children}
        </GraphViewerLayout>
      </aside>
      <aside>
        <nav className="nav">
            {
                ['Group By','Base Key','Graph Type'].map(el=><span 
                    className={activeBar===el? 'active':''}
                    onClick={()=>setActiveBar(el)}
                    key={el}
                >{el}</span>)
            }
        </nav>
        <div>
            { activeBar === 'Group By' && <SelectOption data={columns} onClick={setGroupBy} activeEl={groupBy} />}
            { activeBar === 'Base Key' && <SelectOption data={columns} onClick={setHasOrNotHasBy}  activeEl={hasOrNotHasBy} />}
            { activeBar === 'Graph Type' && <SelectOption data={chartTypes} onClick={setChartType}  activeEl={chartType} />}
            
        </div>
      </aside>
    </section>
  );
};

export default TemplateLayout;

const SelectOption = ({data,onClick,activeEl}:{data:string[],onClick:React.Dispatch<React.SetStateAction<string>>,activeEl:string}) =>{
    return <section
    style={{
      display: "flex",
      gap: "0.2rem",
      flexWrap: "wrap",
      margin: "20px auto",
    }}
  >
    {data.map((el, idx:number) => (
      <div
        style={{
          backgroundColor: activeEl===el?"orange": "lightblue",
          minHeight: "20px",
          padding: "5px 10px",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        key={idx}
        onClick={() => onClick(el)}
      >
        <h4>{el}</h4>
      </div>
    ))}
  </section>
}