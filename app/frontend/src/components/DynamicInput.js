import React from 'react';
// import PropTypes from 'prop-types';

const DynamicInput = ({ value, onChange, placeholder, rows = 4, ...props }) => {
    

    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            {...props}
        />
    );
};

export default DynamicInput;