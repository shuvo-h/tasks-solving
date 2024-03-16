
const PageHead = ({title,tag='h2'}:{title:string,tag:"h1"|"h2"|"h3"|"h4"|"h5"|"h6"}) => {
   const Tag = tag;
    return (
        <div
            style={{
                boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)",
                padding:"8px 0",
            }}
        >
            <Tag 
                style={{
                    textAlign:"center", 
                }}
            >
                {title}
            </Tag>
        </div>
    );
};

export default PageHead;