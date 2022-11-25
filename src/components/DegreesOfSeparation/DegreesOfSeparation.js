import React from 'react';


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


const DegreesOfSeparation = () => {
    

    return (
        <section>
            <h2>Degrees Of Separation</h2>
        </section>
    );
};

export default DegreesOfSeparation;