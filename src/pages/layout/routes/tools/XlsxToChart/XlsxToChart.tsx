import { useState } from "react";
import { TXLSXFile, TXLSXSheetData, xlsxUtils } from "./xlsxToCharUtils";
import Stepper from "../../../../../widget/stepper/Stepper";
import PageHead from "../../../../../widget/PageHead";
import "./XlsxToChart.css";
import FileUpload from "./FileUpload";
import { demoxlData } from "./demoData";
import SheetSelect from "./SheetSelect";
import BaseColumnSelect from "./BaseColumnSelect";
import GraphTemplates from "./GraphTemplates";
import GraphGenerator from "./GraphGenerator";


const XlsxToChart = () => {
    const [activeStep,setActiveStep] = useState(5);
    // const [xlData,setXlData] = useState<TXLSXFile>({sheetData:[],fileName:""} as TXLSXFile)
    const [xlData,setXlData] = useState<TXLSXFile>(demoxlData);
    const [selectedSheet,setSelectedSheet] = useState<TXLSXSheetData>(demoxlData.sheetData[0] as TXLSXSheetData);
    const [selectedPrimaryColumn,setSelectedPrimaryColumn] = useState<string>("Name");
    const [selectedTemplate,setSelectedTemplate] = useState<string>("hasOrNotBarChart");
    console.log(selectedPrimaryColumn,selectedSheet);
    




    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedData = await xlsxUtils.uploadAndConvertXlsxToArray(e);
            setXlData(parsedData);
        } catch (error) {
            console.error('Error parsing XLSX file:', error);
        }
    };
    // console.log(xlData);
    
    
    const steps = [
        {title:"Upload Xlsx File", caption:"Upload the file to read data."},
        {title:"Select the Sheet", caption:"Which Seet do you want to process"},
        {title:"Select the Base Column", caption:"The column will be used to find other column data and analysis"},
        {title:"Choose The Graph Type", caption:"Your data will be used to generate this type of graph"},
        {title:"Select Data", caption:"Select data to be used in graph"},
        {title:"Finally Save Graph", caption:"Save your graph on your device"},
    ]

    

    const handleNext = () =>{
        switch (activeStep) {
            case 1:
                // must have a uploaded file
                if(xlData.fileName) setActiveStep(2);
                else window.alert("Must upload a file")
                break;

            case 2:
                // must select a sheete
                if(selectedSheet.sheet) setActiveStep(3);
                else window.alert("Must select a sheet")
                break;

            case 3:
                // must select a sheete
                if(selectedPrimaryColumn) setActiveStep(4);
                else window.alert("Must select a primary column")
                break;
            case 4:
                // must select a sheete
                if(selectedTemplate) setActiveStep(5);
                else window.alert("Must select a template")
                break;
        
            default:
                break;
        }
    }

    // computed
    // const columnNames = selectedSheet?.data?.length ?  Object.keys(selectedSheet?.data[0]).filter((nameEl)=>nameEl.length) : [];
    // console.log(columnNames);
    
    // filter out empty data based on primary key
    // const filteredData = xlsxUtils.filterEmptyDataForSingleSheet(xlData.sheetData,selectedPrimaryColumn,selectedSheet.sheet);
    // console.log(filteredData);
    // const hsData = graphDataFormatter.hasAndNotHas(filteredData.data,"State","Facebook")
    // console.log(hsData);
    


    const stepbasedComponentHandler = (step:number) =>{
        const components:Record<string,JSX.Element> = {
            "1": <FileUpload onChange={handleFileUpload} fileName={xlData.fileName} />,
            "2": <SheetSelect sheetData={xlData.sheetData} onClick={setSelectedSheet}  />,
            "3": <BaseColumnSelect  sheetData={selectedSheet?.data} onClick={setSelectedPrimaryColumn} />,
            "4": <GraphTemplates onClick={setSelectedTemplate} />,
            "5": <GraphGenerator xlSheetData={xlData.sheetData} template={selectedTemplate} primaryColumn={selectedPrimaryColumn} sheetName={selectedSheet.sheet}  />,
        }
        return components[step.toString()];
    }
    

    return (
        <div>
            <PageHead title="Xlsx To Chart" tag="h2" />
            
            <div className="tool_page">
                <section className="Xlsx_container">
                    <aside>
                        <Stepper steps={steps} activeStep={activeStep} />
                    </aside>
                    <aside>
                        {/* <input type="file" accept=".xlsx" onChange={handleFileUpload} /> */}
                        {stepbasedComponentHandler(activeStep)}
                        <div className="text_center">
                            <button 
                                className="tool_btn" 
                                style={{marginTop:"10px"}} 
                                onClick={handleNext}
                            >next</button>
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
};

export default XlsxToChart;