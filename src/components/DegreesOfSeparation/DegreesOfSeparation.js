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
            // {id: 4,rel: "Dgt"},  // extra
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
        name: "J",
        relations: [
            {id: 7,rel: "Dgt"},
            {id: 4,rel: "Dgt"},
        ]
    },
    
]



const DegreesOfSeparation = () => {

    // A > C > F > H > I > J > D
    // A > E > D
    const store = [];
    // const tempRel = [];
    const relationDegreeFinder = (db=[],searcherId=null,searchingId=null,degreeCount,escapeList=[],searcherName,resultObj) =>{
        // console.log(trakkerArrL," trakkerArrL");
        // return if connection number is >= 5
        if (degreeCount >= 8) {
            return "Not Found";
        }
        // search the searching id in the searcher's own relationship list
        const searcherRealationList = db.find(person => person.id === searcherId)?.relations;
        // look if the sercherid is in this own list
        const foundPerson = searcherRealationList?.find(person => person.id === searchingId);
        // console.log(foundPerson," foundPerson");
        if (foundPerson) {
            // find searchrId name and searcheringId name and return
            const searching = db.find(person => person.id === searchingId).name;
            // console.log(" -- ", `${searcherName} > ${searching}`);
            // return `${searcherName} > ${searching}`;

            return {line: "", searcher:"",searching};
            
        }else{
            
            for(let i=0; i<searcherRealationList?.length; i++){
                const nestedSearcher = db.find(person => person.id === searcherRealationList[i].id).name;
                // console.log(searcherName, " > " ,nestedSearcher,"TT");
                if (!escapeList.includes(searcherRealationList[i].id)) {
                    const nestedFoundPerson = relationDegreeFinder(db,searcherRealationList[i].id,searchingId,degreeCount+1,[...escapeList,searcherRealationList[i].id],nestedSearcher,{});
                    if (nestedFoundPerson) {
                        console.log(nestedFoundPerson);
                        const tempSt = searcherName + " > " + nestedSearcher + " > " + nestedFoundPerson;
                        store.push(tempSt)
                    }else{
                        const tempSt = searcherName + " > " + nestedSearcher;
                        store.push(tempSt)
                    }
                }
            }
        }

        /*
        // console.log(searcher," = ", searcherName);
        if (foundPerson) {
            // find searchrId name and searcheringId name and return
            const searching = db.find(person => person.id === searchingId).name;
            console.log(" -- ", `${searcherName} > ${searching}`);
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
        */
    }
    
    const result = {line:"A"};
    const degreeBase = relationDegreeFinder(db_demo,1,4,0,[1],"A",result);
    console.log(degreeBase,store);

    
    
    return (
        <section>
            <h2>Degrees Of Separation</h2>
        </section>
    );
};

export default DegreesOfSeparation;