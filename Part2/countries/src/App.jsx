import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null); 
  const [weather, setWeather] = useState(null);   
  const [loadingWeather, setLoadingWeather] = useState(false); // ⏳ Weather loading state

  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  // Load all countries once
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  // Filter countries when query changes
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

  // Fetch weather when a country is selected
  useEffect(() => {
    if (selected) {
      const capital = selected.capital[0];
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;//???????????

      setLoadingWeather(true);
      axios.get(url)
        .then(response => {
          setWeather(response.data);
          setLoadingWeather(false);
        })
        .catch(() => {
          setWeather(null);
          setLoadingWeather(false);
        });
    } else {
      setWeather(null);
    }
  }, [selected, apiKey]);

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

        <h2>Weather in {country.capital[0]}</h2>
        {loadingWeather && <p>Loading weather...</p>}
        {!loadingWeather && weather && (
          <div>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
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
