import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiKey, apiUrl } from '../config';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { SearchResponse } from '../types/search';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (query) {
      fetchResults(query);
    } else {
      navigate('/');
    }
  }, [query, navigate]);

  const fetchResults = (searchTerm: string) => {
    setLoading(true);
    setError("");
    
    fetch(`${apiUrl}?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`)
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

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          label="← New Search" 
          onClick={() => navigate('/')} 
          variant="secondary"
        />
        <h2 className="mb-0">
          Search Results for "{query}"
          {results && (
            <span className="badge bg-primary ms-2">{results.totalResults} found</span>
          )}
        </h2>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <div className="mt-2">
            <Button 
              label="Try Another Search" 
              onClick={() => navigate('/')} 
              variant="primary"
              className="btn-sm"
            />
          </div>
        </div>
      )}

      {results && results.Search && (
        <div className="row">
          {results.Search.map((result) => (
            <ResultCard key={result.imdbID} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;