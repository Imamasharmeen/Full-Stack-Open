import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null); 

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
      setSelected(null);
      return;
    }

    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(results);
    setSelected(null); 
  }, [query, countries]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleShow = (country) => {
    setSelected(country);
  };

  const renderCountryDetails = (country) => {
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
  };

  const renderResults = () => {
    if (selected) {
      
      return renderCountryDetails(selected);
    } else if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
      return (
        <ul>
          {filtered.map(country => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filtered.length === 1) {
      return renderCountryDetails(filtered[0]);
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange} />
      </p>

      {renderResults()}
    </div>
  );
};

export default App;
