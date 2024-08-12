//creates a graphical component that visuallize characterizes
//a molecule's affinity for ERK2 based on pIC50
import '../App.css'

import React from 'react';
const Antibody = () => {
    const result = 5;
    const radius = 100;
    const dotRadius = 5;
    const dots = [];

    for (let i = 0; i < result; i++) {
        const angle = (i / result) * 2 * Math.PI;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);

        dots.push(
            <circle
              key={i}
              cx={x}
              cy={y}
              r={dotRadius}
              fill="#cd90be"
            />
          );
    }

    return (
        <svg width={radius * 2} height={radius * 2}>
        <circle cx={radius} cy={radius} r={radius} fill="none" stroke="#709aa4" />
        {dots}
        </svg>
    );
};


export default Antibody;