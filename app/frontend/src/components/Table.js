import React from 'react';

function Table( {data} ) {

    const data_parsed = JSON.parse(data)

    // console.log(data)

    const transformedData = [];
    const keys = Object.keys(data_parsed);
    console.log(keys)
    const length = Object.keys(data_parsed.smiles).length;

    console.log(length)

    for (let i = 0; i < length; i++) {
        const row = {};
        keys.forEach(key => {
            row[key] = data_parsed[key][i];
        });
        transformedData.push(row);
    }

    console.log(transformedData[keys[2]])

    transformedData.sort((a, b) => a[keys[2]] - b[keys[2]]);

    console.log(transformedData)

    if (transformedData.length === 0) {
        return <p>No data available</p>;
    }

    const headers = Object.keys(transformedData[0]);


    const handleDownload = () => {
        downloadCSV(transformedData);
    };

    function convertToCSV(objArray) {
        const headers = Object.keys(objArray[0]);
        const csvRows = [headers.join(',')];
      
        objArray.forEach(obj => {
          const values = headers.map(header => obj[header]);
          csvRows.push(values.join(','));
        });
      
        return csvRows.join('\n');
    }

    function downloadCSV(data, filename = 'table.csv') {
        const csv = convertToCSV(data);
        console.log(csv)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
      
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    


    return (
        <div className = "table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transformedData.map((row, index) => (
                        <tr key={index}>
                            {headers.map(header => (
                                <td key={header}>{row[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="download"
                    onClick={handleDownload}
                    width="100%">download data to csv</button>
        </div>
    )
}

export default Table;