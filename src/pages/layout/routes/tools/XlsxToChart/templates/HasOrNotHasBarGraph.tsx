/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { graphDataFormatter } from "../xlsxToCharUtils";
import StackedBarChart from "./HasOrNotHas/StackedBarChart";
import "./template.css";

type THasOrNotHasBarGraphProps = {
  filteredData: any[];
  sheetName: string;
  primaryColumn: string;
};
const chartTypes = [ 
    'stackedBar100', 
    'stackedColumn100', 
    'stackedBar',
    'stackedColumn', 
    'bar',
    'line', 
    // 'pie', 
    // 'doughnut', 
];

const HasOrNotHasBarGraph = ({ filteredData,primaryColumn, }: THasOrNotHasBarGraphProps) => {
  const [activeBar, setActiveBar] = useState("Group By");
  const [chartType, setChartType] = useState('stackedBar');
  const [groupBy, setGroupBy] = useState(primaryColumn);
  const [hasOrNotHasBy, setHasOrNotHasBy] = useState("");
  const hsData = graphDataFormatter.hasAndNotHas(
    filteredData,
    groupBy,
    hasOrNotHasBy
  );
  const columns = filteredData.length
    ? Object.keys(filteredData[0]).filter((nameEl) => nameEl.length)
    : [];
  console.log(hsData);

  return (
    <section  className="hasOrNoHasPage_container">
      <aside>
        <StackedBarChart data={hsData} chartType={chartType} />
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

export default HasOrNotHasBarGraph;

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