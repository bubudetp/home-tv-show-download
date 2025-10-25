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

  React.useEffect(() => {
    if (!query) {
      navigate('/');
    }
  }, [query, navigate]);

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center my-5">
          <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 h5">Searching library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3" style={{ backgroundColor: 'var(--jellyfin-bg-card)', borderRadius: '8px' }}>
        <Button
          label={<><i className="bi bi-arrow-left me-2"></i>New Search</>}
          onClick={() => navigate('/')}
          variant="secondary"
        />
        <div className="text-end">
          <h2 className="mb-1 h4">Search Results</h2>
          <p className="text-muted mb-0">
            "{query}" 
            {results && (
              <span className="badge bg-primary ms-2">{results.totalResults} found</span>
            )}
          </p>
        </div>
      </div>

      {isError && (
        <div className="alert alert-warning shadow-lg" role="alert">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
            <div className="flex-grow-1">
              <strong>No results found</strong>
              <p className="mb-2">{error instanceof Error ? error.message : 'An error occurred while searching'}</p>
              <Button
                label="Try Another Search"
                onClick={() => navigate('/')}
                variant="primary"
                className="btn-sm"
              />
            </div>
          </div>
        </div>
      )}

      {results && results.Search && (
        <>
          <div className="mb-3">
            <small className="text-muted">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              Showing {results.Search.length} of {results.totalResults} results
            </small>
          </div>
          <div className="row">
            {results.Search.map((result) => (
              <ResultCard key={result.imdbID} result={result} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Results;