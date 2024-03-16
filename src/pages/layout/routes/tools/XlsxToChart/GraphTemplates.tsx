

const GraphTemplates = () => {
    return (
        <div>
            <h2 style={{margin:"12px auto"}}>Choose a Template to draw graph</h2>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap",margin:"20px auto"}}>
                {/* {
                    [].map((sheetEl,idx)=><div 
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
                        // onClick={()=>onClick(sheetEl)}
                    >
                        <h4>{sheetEl}</h4>
                    </div>)
                } */}
            </div>
        </div>
    );
};

export default GraphTemplates;