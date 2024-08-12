import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DynamicInput = ({ value, onChange, placeholder, rows = 4, ...props }) => {
    
    const [input, setInput] = useState()


    return (
        <textarea
            value={input}
            placeholder={placeholder}
            rows={rows}
            {...props}
        />
    );
};

export default DynamicInput;