
export const templateList = [
    {
        key:"hasOrNotBarChart",
        title:"Has Or Not Comparisn",
        type:"Bar Chart"
    },
    {
        key:"",
        title:"test 2",
        type:"Pie Chart"
    },
]
type TGraphTemplatesProps = {
    onClick:  React.Dispatch<React.SetStateAction<string>>
}

const GraphTemplates = ({onClick}:TGraphTemplatesProps) => {

    return (
        <div>
            <h2 style={{margin:"12px auto"}}>Choose a Template to draw graph</h2>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap",margin:"20px auto"}}>
                {
                    templateList.map((tplEl,idx)=><div 
                        style={{
                            backgroundColor:"lightblue",
                            minHeight:"50px",
                            padding:"5px 30px",
                            borderRadius:"4px",
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"center",
                            alignItems:"center",
                            cursor:"pointer"
                        }} 
                        key={idx}
                        onClick={()=>onClick(tplEl.key)}
                    >
                        <h4>{tplEl.title}</h4>
                        <small>{tplEl.type}</small>
                    </div>)
                } 
            </div>
        </div>
    );
};

export default GraphTemplates;