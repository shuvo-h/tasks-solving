/* eslint-disable @typescript-eslint/no-explicit-any */
export type TTemplate = keyof typeof TEMPLATES;

export const TEMPLATES = {
    hasOrNotBarChart:"hasOrNotBarChart",
    hasOrNotPieChart:"hasOrNotPieChart",
}

export const templateList = [
    {
        key: TEMPLATES.hasOrNotBarChart,
        title:"Has Or Not Comparisn",
        type:"Bar Chart"
    },
    {
        key: TEMPLATES.hasOrNotPieChart,
        title:"Has Or Not Pie Comparisn",
        type:"Pie Chart"
    },
    {
        key:"",
        title:"test 2",
        type:"Pie Chart"
    },
]
type TGraphTemplatesProps = {
    onClick:  React.Dispatch<React.SetStateAction<TTemplate>>
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
                        onClick={()=>onClick(tplEl.key as any)}
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