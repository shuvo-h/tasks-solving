/* eslint-disable @typescript-eslint/no-explicit-any */

type TBaseColumnSelect = {
    sheetData: any[]
    onClick:  React.Dispatch<React.SetStateAction<string>>
}
const BaseColumnSelect = ({onClick,sheetData}:TBaseColumnSelect) => {
    const columns = sheetData.length ?  Object.keys(sheetData[0]).filter((nameEl)=>nameEl.length) : [];
    return (
        <div>
            <h2 style={{margin:"12px auto"}}>Choose a Your Base Column</h2>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap",margin:"20px auto"}}>
                {
                    columns.map((columnEl,idx)=><div 
                        style={{
                            backgroundColor:"lightblue",
                            minHeight:"50px",
                            padding:"5px 30px",
                            borderRadius:"4px",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            cursor:"pointer"
                        }} 
                        key={idx}
                        onClick={()=>onClick(columnEl)}
                    >
                        <h4>{columnEl}</h4>
                    </div>)
                }
            </div>
        </div>
    );
};

export default BaseColumnSelect;