import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
          {
            headers: {
              'X-Api-Key':'tikwKZGJKcUj8HLCjvrsil8AMs73UkE8DGSaqUTE'
            }
          }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch(error) {
        setError(null);
      }
      setIsLoading(false);
    }
    if(searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm])
  return (
    <div className="App">
      <form>
        <label>Search for a celebrity networth:</label>
        <input 
          type="text"
          id="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </form>
      {isLoading ? (
        <p>One moment please ...</p>
      ) : (
        searchResults.map(result => (
          <div key={result.id}>
            <h1>{result.name}</h1>
            <p>{result.max_height}</p>
            <p>Nepo Baby Net worth from 2023: {result.net_worth}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
