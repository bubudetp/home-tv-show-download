import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { useSearchMovies } from '../hooks/useSearchMovies';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results, isLoading, isError, error } = useSearchMovies(query);

  // Redirect to home if no query
  React.useEffect(() => {
    if (!query) {
      navigate('/');
    }
  }, [query, navigate]);

  if (isLoading) {
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

      {isError && (
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error instanceof Error ? error.message : 'An error occurred while searching'}
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