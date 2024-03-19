import { useEffect, useState } from "react";
import { TEMPLATES, TTemplate } from "./GraphTemplates";
import HasOrNotHasBarGraph from "./templates/HasOrNotHasBarGraph";
import HasOrNotHasPieGraph from "./templates/HasOrNotHasPieGraph";
import TemplateLayout from "./templates/TemplateLayout";
import { TXLSXSheetData, xlsxUtils } from "./xlsxToCharUtils";
import useCanvasjsConfig, {
  TIndexLabelConfig,
} from "./templates/sharedComponents/useCanvasjsConfig";

type TGraphGeneratorProps = {
  template: TTemplate;
  xlSheetData: TXLSXSheetData[];
  primaryColumn: string;
  sheetName: string;
};

const GraphGenerator = ({
  template,
  xlSheetData,
  primaryColumn,
  sheetName,
}: TGraphGeneratorProps) => {
  // console.log(template,xlSheetData);
  const {
    yAxisConfigure,
    setYAxisConfigure,
    xAxisConfigure,
    setXAxisConfigure,
    legendConfigure,
    setLegendConfigure,
    titleConfig,
    setTitleConfig,
    // indexLabelConfig: indexLabelConfigHas,
    // setIndexLabelConfig: setIndexLabelConfigHas,
    customConfig,
    setCustomConfig,
  } = useCanvasjsConfig({ suffixShown: () => "" });
  

  const [chartType, setChartType] = useState("pie");
  const filteredData = xlsxUtils.filterEmptyDataForSingleSheet(
    xlSheetData,
    primaryColumn,
    sheetName
  );
  console.log(filteredData);
  const [hasOrNotHasBy, setHasOrNotHasBy] = useState("");
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [indexLabelConfigs, setIndexLabelConfigs] = useState<
    TIndexLabelConfig[]
  >([]);
  console.log(indexLabelConfigs);
  useEffect(() => {
    const brightColors = [
      "#FF5733",
      "#FFC300",
      "#DAF7A6",
      "#FF5733",
      "#C70039",
      "#900C3F",
      "#581845",
      "#C70039",
      "#FF5733",
      "#FF5733",
      "#FFC300",
      "#FF5733",
      "#FF5733",
      "#FFC300",
      "#FFC300",
    ];
  
    setIndexLabelConfigs(prevConfigs => {
      const newConfigs: TIndexLabelConfig[] = [...prevConfigs];
      const existingConfigsLength = prevConfigs.length;
  
      for (let i = existingConfigsLength; i < totalDataSet; i++) {
        const randomColor =
          brightColors[Math.floor(Math.random() * brightColors.length)];
        newConfigs.push({
          indexLabel: "{label} - {y}",
          indexLabelFontColor: randomColor,
          indexLabelFontSize: 12,
          indexLabelFontStyle: "italic",
          indexLabelFontWeight: "normal",
          indexLabelBackgroundColor: "transparent",
          indexLabelBorderColor: "transparent",
          indexLabelPadding: 5,
          indexLabelWrap: false,
          indexLabelMaxWidth: null,
          indexLabelPlacement: "inside",
          indexLabelLineThickness: 1,
          indexLabelOrientation: "vertical",
        });
      }
      return newConfigs;
    });
  }, [totalDataSet]);
  
  const defaultCanvasjsOptions = {
    theme: customConfig.theme, // "light1", "light2", "dark1", "dark2"
    height: customConfig.height || 100,
    width: customConfig.width || 100,
    animationEnabled: true,
    exportEnabled: true,
    title: titleConfig,
    axisX: xAxisConfigure, //suffix add manually for each template in templateLayout
    axisY: yAxisConfigure,
    legend: legendConfigure,
    toolTip: {
      shared: true,
      reversed: true,
    },
    data: [], //data add manually for each template in templateLayout to make separate data structure
  };

  const templateDecider = () => {
    switch (template) {
      case TEMPLATES.hasOrNotBarChart:
        return (
          <HasOrNotHasBarGraph
            filteredData={filteredData.data}
            primaryColumn={primaryColumn}
            sheetName={sheetName}
          />
        );
      case TEMPLATES.hasOrNotPieChart:
        // return <HasOrNotHasPieGraph filteredData={filteredData.data} />;
        return (
          <TemplateLayout
            template={template}
            filteredData={filteredData.data}
            chartType={chartType}
            setChartType={setChartType}
            primaryColumn={primaryColumn}
            customConfig={customConfig}
            setCustomConfig={setCustomConfig}
            legendConfigure={legendConfigure}
            setLegendConfigure={setLegendConfigure}
            setTitleConfig={setTitleConfig}
            setXAxisConfigure={setXAxisConfigure}
            setYAxisConfigure={setYAxisConfigure}
            titleConfig={titleConfig}
            xAxisConfigure={xAxisConfigure}
            yAxisConfigure={yAxisConfigure}
            indexLabelConfigs={indexLabelConfigs}
            setIndexLabelConfigs={setIndexLabelConfigs}
            hasOrNotHasBy={hasOrNotHasBy}
            setHasOrNotHasBy={setHasOrNotHasBy}
          >
            <HasOrNotHasPieGraph
              chartType={chartType}
              filteredData={filteredData.data}
              defaultCanvasjsOptions={defaultCanvasjsOptions}
              setTotalDataSet={setTotalDataSet}
              hasOrNotHasBy={hasOrNotHasBy}
              indexLabelConfigs={indexLabelConfigs}
            />
            <p>Active Pie Tempa</p>
          </TemplateLayout>
        );

      default:
        break;
    }
  };
  return (
    <div>
      GraphGenerator
      <h2>{template}</h2>
      {templateDecider()}
    </div>
  );
};

export default GraphGenerator;
