import React from 'react';


const db_demo = [
    { 
        id: 1,
        name: "A",
        relations: [
            {id: 3,rel: "mom"},
            {id: 5,rel: "dad"},
        ]
    },
    { 
        id: 2,
        name: "B",
        relations: [
            {id: 6,rel: "fri"},
            {id: 3,rel: "dad"},
            {id: 4,rel: "son"},
        ]
    },
    { 
        id: 3,
        name: "C",
        relations: [
            {id: 1,rel: "son"},
            {id: 6,rel: "dad"},
        ]
    },
    { 
        id: 4,
        name: "D",
        relations: [
            {id: 5,rel: "Fri"},
            {id: 2,rel: "mom"},
        ]
    },
    { 
        id: 5,
        name: "E",
        relations: [
            {id: 4,rel: "Fri"},
            {id: 6,rel: "Fri"},
        ]
    },
    { 
        id: 6,
        name: "F",
        relations: [
            {id: 3,rel: "Dgt"},
            {id: 8,rel: "Dgt"},
        ]
    },
    { 
        id: 7,
        name: "G",
        relations: [
            {id: 8,rel: "Dgt"},
            {id: 9,rel: "Dgt"},
        ]
    },
    { 
        id: 8,
        name: "H",
        relations: [
            {id: 6,rel: "Dgt"},
            // {id: 7,rel: "Dgt"},
            {id: 9,rel: "Dgt"},
        ]
    },
    { 
        id: 9,
        name: "I",
        relations: [
            {id: 7,rel: "Dgt"},
            {id: 10,rel: "Dgt"},
        ]
    },
    { 
        id: 10,
        name: "I",
        relations: [
            {id: 7,rel: "Dgt"},
            {id: 4,rel: "Dgt"},
        ]
    },
    
]


const DegreeFIn = () => {

    const relationDegreeFinder = (db=[],searcherId=null,searchingId=null,degreeCount,escapeList=[],searcherName) =>{
        // return if connection number is >= 5
        if (degreeCount >= 5) {
            return "Not Found"
        }
        // search the searching id in the searcher's own relationship list
        const searcherRealationList = db.find(person => person.id === searcherId)?.relations;
        // look if the sercherid is in this own list
        const foundPerson = searcherRealationList?.find(person => person.id === searchingId);
        const searcher = db.find(person => person.id === searcherId).name;
        // console.log(searcher," = ", searcherName);
        if (foundPerson) {
            // find searchrId name and searcheringId name and return
            const searching = db.find(person => person.id === searchingId).name;
            return `${searcherName} > ${searching}`;
        }else{
            // look for the list of next degree 
            for(let i=0; i<searcherRealationList?.length; i++){
                // console.log(escapeList,"escapeList");
                if (!escapeList.includes(searcherRealationList[i].id)) {
                    const nestedSearcher = db.find(person => person.id === searcherRealationList[i].id).name;
                    const nestedFoundPerson = relationDegreeFinder(db,searcherRealationList[i].id,searchingId,degreeCount+1,[...escapeList,searcherRealationList[i].id],nestedSearcher);
                    if (nestedFoundPerson) {
                        return searcherName + " > " + nestedFoundPerson;
                    }
                }
            }
        }
        
    }
    const degreeBase = relationDegreeFinder(db_demo,1,4,0,[1],"A");
    console.log(degreeBase.split(" > ").includes("Not Found"));
    console.log("Final Base relation degree = ",degreeBase);

    return (
        <div>
            Degree FIn
        </div>
    );
};

export default DegreeFIn;