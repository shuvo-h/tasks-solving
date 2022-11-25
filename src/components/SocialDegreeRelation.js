import React from 'react';

// A,B,C,D,E,F,G

const db_demo = [
    { name: "A", relation: ["B1","D1","F","K","L","N","X","Y"] },
    { name: "B", relation: ["A","D","F","M","K","O","X","Y"] },
    { name: "C", relation: ["H","D","N","O"] },
    { name: "D", relation: ["B","F","M"] },
    { name: "E", relation: ["E","C","G"] },
    { name: "F", relation: ["B","D","C"] },
    { name: "G", relation: ["C","F","B"] },
    { name: "H", relation: ["I","L","Y"] },
    { name: "M", relation: ["I","L","Z"] },
    { name: "Y", relation: ["I","L","C"] },
    { name: "Z", relation: ["I","Y","O","K","M","G"] },
]

const SocialDegreeRelation = () => {
    // A > F > G
    const resFn = (db,me,fr,connectionNumber,escapedList=[]) =>{
        // console.log(me, "is loking", fr);
        // console.log(escapedList,"escapedList");
        console.log(connectionNumber," connectionNumber");
        if (connectionNumber >= 5) {
            return "Social distance far away than six"
        }
        // search for friend in my friend list
        const frList = db.find(person => person.name === me)?.relation;
        // look if my friend is in this list,
        const finedFriend = frList?.find(myFr => myFr === fr);
        if (finedFriend) {
            // console.log("FFFOOUUNNDD ", finedFriend);
            // return me + " > " + fr;
            return `${me} > ${fr}`;
        }else{
            for(let i=0; i<frList?.length; i++){
                // frList[i] = ["B","D","F"]
                
                if (!escapedList.includes(frList[i])) {
                    const nestedFr =  resFn(db,frList[i],fr,connectionNumber+1,[...escapedList,"me",...frList]);
                    // console.log(nestedFr, " nestedFr");
                    if (nestedFr) {
                        // return  me + " > " + nestedFr;
                        return  `${me} > ${nestedFr}`;
                    }
                }
            }
        }
    }

    console.log(resFn(db_demo,"A","G",0,[]));

    return (
        <div>
            <h2>Social Degree Relation</h2>
            <div>

            </div>
        </div>
    );
};

export default SocialDegreeRelation;