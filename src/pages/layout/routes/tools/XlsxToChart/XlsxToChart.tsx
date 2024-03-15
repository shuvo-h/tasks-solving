import { useState } from "react";
import { TXLSXSheetData, xlsxUtils } from "./xlsxToCharUtils";


const XlsxToChart = () => {
    const [xlData,setXlData] = useState<TXLSXSheetData[]>([])
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedData = await xlsxUtils.uploadAndConvertXlsxToArray(e);
            setXlData(parsedData);
        } catch (error) {
            console.error('Error parsing XLSX file:', error);
        }
    };
    // console.log(xlData);
    
    // filter out empty data based on primary key
    const primaryKey = "Name";
    const filteredData = xlsxUtils.filterEmptyData(xlData,primaryKey);
    console.log(filteredData);
    

    return (
        <div>
            <h1>XlsxToChart</h1>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        </div>
    );
};

export default XlsxToChart;