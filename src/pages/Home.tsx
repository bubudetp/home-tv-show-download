import React, { useState } from 'react';
import { apiKey, apiUrl } from '../config';
import SearchInput from '../components/SearchInput';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { SearchResponse } from '../types/search';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    console.log("Search submitted:", searchTerm);
    setLoading(true);
    setError("");

    console.log(`Fetching from API: ${apiUrl}?s=${searchTerm}&apikey=${apiKey}`);
    
    fetch(`${apiUrl}?s=${searchTerm}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data: SearchResponse) => {
        console.log("API Response:", data);
        
        if (data.Response === "True") {
          setResults(data);
        } else {
          setError("No results found. Try a different search term.");
          setResults(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  };

  const handleKeyPress = () => {
    handleSubmit();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">
            <i className="bi bi-film me-2"></i>
            Movie & TV Show Search
          </h1>
          <p className="text-center text-muted mb-4">
            Search for your favorite movies and TV shows
          </p>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleKeyPress}
                placeholder="Search for movies or TV shows..."
                label="Search"
                showSearchIcon={true}
              />
              <Button 
                label={loading ? "Searching..." : "Search"} 
                onClick={handleSubmit}
                disabled={loading}
                fullWidth={true}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Searching...</p>
        </div>
      )}

      {results && results.Search && (
        <div className="mt-5">
          <h2 className="mb-4">
            Search Results 
            <span className="badge bg-primary ms-2">{results.totalResults} found</span>
          </h2>
          <div className="row">
            {results.Search.map((result) => (
              <ResultCard key={result.imdbID} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;