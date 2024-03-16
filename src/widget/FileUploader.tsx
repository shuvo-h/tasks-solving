import { useRef } from "react";

interface FileUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string
}
  

const FileUploader = ({onChange,accept}:FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInputButtonClick = () =>{
        if (inputRef.current) {
            inputRef.current.click(); // Trigger file input dialog which is display none
        }
    }
    return (
        <>
            <input 
                ref={inputRef}
                style={{display:"none"}}
                className="uploader_btn" 
                type="file" 
                accept={accept} 
                onChange={onChange} 
            />
            <button className="tool_btn" onClick={handleInputButtonClick}>Upload File</button>
        </>
    );
};

export default FileUploader;