

import FileUploader from "../../../../../widget/FileUploader";

interface FileUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string
}
  

const FileUpload = ({onChange,fileName}:FileUploadProps) => {
   

  
    
    return (
        <>
            <h3 style={{margin:"12px auto"}}>Upload .xlsx file</h3>
            <div style={{textAlign:"center"}}>
                <h2>{fileName}</h2>
                <div>
                    <FileUploader accept=".xlsx" onChange={onChange} />
                </div>
            </div>
        </>
    );
};

export default FileUpload;