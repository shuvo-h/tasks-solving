/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';

export interface TXLSXSheetData {
    sheet: string;
    data: any[];
}
export interface TXLSXFile {
    fileName:string,
    sheetData: TXLSXSheetData[]
} 

export const xlsxUtils = {
    uploadAndConvertXlsxToArray(e: React.ChangeEvent<HTMLInputElement>): Promise<TXLSXFile> {
        return new Promise((resolve, reject) => {
            const file = e.target?.files ? e.target.files[0] : null;

            if (!file) {
                resolve({sheetData:[],fileName:""});
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const workbook = XLSX.read(e.target?.result as string, { type: 'binary' });
                const sheetData: TXLSXSheetData[] = [];

                workbook.SheetNames.forEach((sheetName) => {
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData:any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    const headers: any[] = jsonData[0];
                    const rows: unknown[][] = jsonData.slice(1);

                    const parsedData = rows.map((row: unknown[]) => {
                        const obj: any = {};
                        if (Array.isArray(row)) {
                            headers.forEach((header, index) => {
                                obj[header] = row[index];
                            });
                        }
                        return obj;
                    });

                    sheetData.push({ sheet: sheetName, data: parsedData });
                });

                resolve({fileName:file.name,sheetData});
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsBinaryString(file);
        });
    },

    // [{sheet:"",data:[{colName1:"",...}]}]
    filterEmptyData (sheetsData:TXLSXSheetData[],primaryKeyToFilter:string){
        // Iterate over each sheet object
        const filteredSheets = sheetsData.map(sheetObj => {
            // Filter out objects within each sheet where the 'Name' property is falsy
            const filteredData = sheetObj.data.filter(entry => entry[primaryKeyToFilter]);
            // Return the filtered data along with the sheet information
            return {
                sheet: sheetObj.sheet,
                data: filteredData
            };
        });
        return filteredSheets;
    },
    filterEmptyDataForSingleSheet (sheetsData:TXLSXSheetData[],primaryKeyToFilter:string,sheetName: string){
        const sheetObj = sheetsData.find(sheet => sheet.sheet === sheetName);
        if (!sheetObj) {
            return {sheet:sheetName,data:[]};
        }
         // Filter out objects within the specified sheet where the primary key property is truthy
        const filteredData = sheetObj.data.filter(entry => entry[primaryKeyToFilter]);
        return {
            sheet: sheetObj.sheet,
            data: filteredData
        };
    },
};
