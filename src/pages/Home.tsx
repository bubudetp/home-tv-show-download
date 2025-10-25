import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiKey, apiUrl } from '../config';
import SearchInput from '../components/SearchInput';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { SearchResponse } from '../types/search';

const Home: React.FC = () => {
  const navigate = useNavigate();
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
    
    fetch(`${apiUrl}=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`)
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

  const handleQuickSearch = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie or show name");
      return;
    }
    
    navigate(`/details/${encodeURIComponent(searchTerm)}`);
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
              
              <div className="d-flex gap-2">
                <Button 
                  label={loading ? "Searching..." : "Search Multiple Results"} 
                  onClick={handleSubmit}
                  disabled={loading}
                  variant="primary"
                  className="flex-grow-1"
                />
                <Button 
                  label="Quick View" 
                  onClick={handleQuickSearch}
                  disabled={loading}
                  variant="success"
                />
              </div>
              
              <small className="text-muted d-block mt-2">
                <i className="bi bi-info-circle me-1"></i>
                Use "Search Multiple Results" to see all matches, or "Quick View" to go directly to a specific title
              </small>
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