import { useState } from 'react';

export default function ApiTest() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const testFetch = async () => {
    try {
      const response = await fetch('http://localhost:8000/health');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResult('');
    }
  };

  const testAxios = async () => {
    try {
      const axios = (await import('axios')).default;
      const response = await axios.get('http://localhost:8000/health');
      setResult(JSON.stringify(response.data, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Connection Test</h1>
      <button onClick={testFetch} style={{ margin: '10px', padding: '10px' }}>
        Test with Fetch
      </button>
      <button onClick={testAxios} style={{ margin: '10px', padding: '10px' }}>
        Test with Axios
      </button>
      {error && <div style={{ color: 'red', marginTop: '20px' }}>Error: {error}</div>}
      {result && <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '10px' }}>{result}</pre>}
    </div>
  );
}
