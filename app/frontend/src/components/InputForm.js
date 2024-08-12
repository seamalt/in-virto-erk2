import React, { useState } from 'react';
import DynamicInput from './DynamicInput';

function InputForm({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DynamicInput
        style={{fontStyle: 'italic'}}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter SMILES entries separated by (,) ..."
      />

      {/*<input
        type="text"
        style={{fontStyle: 'italic'}}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder= "enter SMILES entries separated by (,) ..."
      />*/}
      <button type="submit">submit</button>
    </form>
  );
}

export default InputForm;