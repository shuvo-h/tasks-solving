import  { ReactNode,  useEffect,  useState } from "react";
import TitleConfigurator from "./sharedComponents/TitleConstructor";
import CustomConfigurator from "./sharedComponents/CustomConfigurator";
import AxisConfigurator from "./sharedComponents/AxisConfigurator";
import LegendConfigurator from "./sharedComponents/LegendConfigurator";
import IndexLabelConfigurator from "./sharedComponents/IndexLabelConfigurator";
import useCanvasjsConfig, { TAxiosConfig, TCustomConfig, TIndexLabelConfig, TLegendConfigure, TTitleConfig } from "./sharedComponents/useCanvasjsConfig";



type TStackedBarChartprops = {
  children: ReactNode,
  yAxisConfigure: TAxiosConfig,
  setYAxisConfigure: React.Dispatch<React.SetStateAction<TAxiosConfig>>,
  xAxisConfigure: TAxiosConfig,
  setXAxisConfigure:React.Dispatch<React.SetStateAction<TAxiosConfig>>,
  legendConfigure: TLegendConfigure,
  setLegendConfigure: React.Dispatch<React.SetStateAction<TLegendConfigure>>,
  titleConfig: TTitleConfig,
  setTitleConfig: React.Dispatch<React.SetStateAction<TTitleConfig>>,
  indexLabelConfigs: TIndexLabelConfig[],
  setIndexLabelConfigs:React.Dispatch<React.SetStateAction<TIndexLabelConfig[]>>,
  customConfig: TCustomConfig,
  setCustomConfig:React.Dispatch<React.SetStateAction<TCustomConfig>>
};

const GraphViewerLayout = ({ 
  children,
  yAxisConfigure,
  setYAxisConfigure,
  xAxisConfigure,
  setXAxisConfigure,
  legendConfigure,
  setLegendConfigure,
  titleConfig,
  setTitleConfig,
  indexLabelConfigs,
  setIndexLabelConfigs, 
  customConfig,
  setCustomConfig
}: TStackedBarChartprops) => {
   
 useEffect(()=>{
    const chartContainer = document.getElementById("canvajsChart");
    if (chartContainer && chartContainer.firstChild) {
      const firstChild = chartContainer.firstChild as HTMLElement;
      firstChild.style.width = `${customConfig.width}px`;
      firstChild.style.height = `${customConfig.height}px`;
    }
  },[customConfig.width,customConfig.height])
  
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
      <div>
        {children}
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
        {/* 
          For this <IndexLabelConfigurator>, later you will use array to keep the indexLabelConfig and and setIndexLabelConfigHas in <GraphGenerator> and pass the array where need and render the index label dynamically
          For useCanvasjsConfig() hook, look for the way how can you dynamically create the hook call
        */}
        {/*         
          <div>
            <h4>Index Label Configure (Has)</h4>
            <IndexLabelConfigurator indexLabelConfig={indexLabelConfigHas}  setIndexLabelConfig={setIndexLabelConfigHas} />
          </div>
          <div>
            <h4>Index Label Configure (HasNot)</h4>
            <IndexLabelConfigurator indexLabelConfig={indexLabelConfigHasNot}  setIndexLabelConfig={setIndexLabelConfigHasNot} />
          </div> 
        */}

        {
          indexLabelConfigs.map((indexLabelConfig,idx)=><div>
            <h4>Index Label Configure {idx+1}</h4>
            <IndexLabelConfigurator indexLabelConfig={indexLabelConfig}  setArrayIndexIndexLabelConfig={setIndexLabelConfigs} arrayIndex={idx} key={idx} />
          </div>)
        }
      </div>
    </div>
  );
};

export default GraphViewerLayout;



