/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';

export interface TXLSXSheetData {
    sheet: string;
    data: any[];
}

export const xlsxUtils = {
    uploadAndConvertXlsxToArray(e: React.ChangeEvent<HTMLInputElement>): Promise<TXLSXSheetData[]> {
        return new Promise((resolve, reject) => {
            const file = e.target?.files ? e.target.files[0] : null;

            if (!file) {
                resolve([]);
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

                resolve(sheetData);
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
};
