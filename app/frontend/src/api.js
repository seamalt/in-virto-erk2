const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2001';

export const fetchData = async (input) => {
  console.log({input});
  console.log('API URL:', process.env.REACT_APP_API_URL);

  const response = await fetch(`${API_URL}/api/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  }); 

  console.log(response);
    
  if (!response.ok) {
    throw new Error('Improper input provided');
  }
  
  return response.json(); 

  //test for endpoint. works
  //const result = input.toUpperCase();
  //return { result: result };

};