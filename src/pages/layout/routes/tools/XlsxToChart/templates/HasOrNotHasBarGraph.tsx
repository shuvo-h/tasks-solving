/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { graphDataFormatter } from "../xlsxToCharUtils";
import StackedBarChart from "./HasOrNotHas/StackedBarChart";

type THasOrNotHasBarGraphProps = {
    filteredData:  any[]
}

const HasOrNotHasBarGraph = ({filteredData}:THasOrNotHasBarGraphProps) => {
    const [groupBy,setGroupBy] = useState("");
    const [hasOrNotHasBy,setHasOrNotHasBy] = useState("");
    const hsData = graphDataFormatter.hasAndNotHas(filteredData,groupBy,hasOrNotHasBy);
    const columns = filteredData.length ?  Object.keys(filteredData[0]).filter((nameEl)=>nameEl.length) : [];
    console.log(hsData);

    return (
        <div>
            <div>
                <h2>Group By</h2>
                <section style={{display:"flex", gap:"1rem", flexWrap:"wrap",margin:"20px auto"}}>
                {
                    columns.map((col,idx)=><div 
                        style={{
                            backgroundColor:"lightblue",
                            minHeight:"50px",
                            padding:"5px 30px",
                            borderRadius:"4px",
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"center",
                            alignItems:"center",
                            cursor:"pointer"
                        }} 
                        key={idx}
                        onClick={()=>setGroupBy(col)}
                    >
                        <h4>{col}</h4>
                    </div>)
                } 
                </section>
            </div>
            <div>
                <h2>Comparisn Column</h2>
                <section style={{display:"flex", gap:"1rem", flexWrap:"wrap",margin:"20px auto"}}>
                {
                    columns.map((col,idx)=><div 
                        style={{
                            backgroundColor:"lightblue",
                            minHeight:"50px",
                            padding:"5px 30px",
                            borderRadius:"4px",
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"center",
                            alignItems:"center",
                            cursor:"pointer"
                        }} 
                        key={idx}
                        onClick={()=>setHasOrNotHasBy(col)}
                    >
                        <h4>{col}</h4>
                    </div>)
                } 
                </section>
            </div>
            HasOrNotHasBarGraph
            <div>
                <StackedBarChart data={hsData} />
            </div>
        </div>
    );
};

export default HasOrNotHasBarGraph;