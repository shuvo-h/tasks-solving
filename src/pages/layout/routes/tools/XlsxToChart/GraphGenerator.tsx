import { templateList } from "./GraphTemplates";
import HasOrNotHasBarGraph from "./templates/HasOrNotHasBarGraph";
import HasOrNotHasPieGraph from "./templates/HasOrNotHasPieGraph";
import { TXLSXSheetData, xlsxUtils } from "./xlsxToCharUtils";

type TGraphGeneratorProps ={
    template: string,
    xlSheetData: TXLSXSheetData[]
    primaryColumn: string
    sheetName: string
}

const templates = templateList.reduce((acc,el)=>{acc[el.key]=el.key; return acc},{} as {[key:string]:string})


const GraphGenerator = ({template,xlSheetData,primaryColumn,sheetName}:TGraphGeneratorProps) => {
    // console.log(template,xlSheetData);
    const filteredData = xlsxUtils.filterEmptyDataForSingleSheet(xlSheetData,primaryColumn,sheetName);

    console.log(filteredData);
    const templateDecider = () =>{
        switch (template) {
            case templates['hasOrNotBarChart']:
                return <HasOrNotHasBarGraph filteredData={filteredData.data} />;
            case templates['hasOrNotPieChart']:
                return <HasOrNotHasPieGraph filteredData={filteredData.data} />;
        
            default:
                break;
        }
    }
    return (
        <div>
            GraphGenerator
            <h2>{template}</h2>
            {
                templateDecider()
            }
        </div>
    );
};

export default GraphGenerator;