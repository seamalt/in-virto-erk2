import React from 'react';
import Table from './Table';

function ResultDisplay({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div>
        <pre>Error: {result.error}</pre>
      </div>

    );
  }

  console.log(Object.keys(result))



  return (
    <div>
      <h3>Predicted pIC50 values with ERK2 based on SMILES input</h3>
      <Table data={/*JSON.stringify*/(result.prediction/*, null, 2*/)}/>
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </div>
  );
}

//<pre>{JSON.stringify(result, null, 2)}</pre>
// was within the result 

export default ResultDisplay;
