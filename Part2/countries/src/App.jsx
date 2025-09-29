import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered([]);
      return;
    }

    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(results);
  }, [query, countries]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const renderResults = () => {
    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
      return (
        <ul>
          {filtered.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else if (filtered.length === 1) {
      const country = filtered[0];


      
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area} km²</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>

          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="200"
          />
        </div>
      );
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <p>find countries <input value={query} onChange={handleChange}  /> </p>
      
      {renderResults()}
    </div>
  );
};

export default App;
