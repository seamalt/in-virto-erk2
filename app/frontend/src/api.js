//const API_URL = 'http://localhost:5000/api';

export const fetchData = async (input) => {
  console.log({input});

  const response = await fetch(`/api/predict`, {
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