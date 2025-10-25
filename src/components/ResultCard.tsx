import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../types/search';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/details/${result.imdbID}`);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={result.Poster !== 'N/A' ? result.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          className="card-img-top"
          alt={result.Title}
          style={{ height: '350px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{result.Title}</h5>
          <p className="card-text text-muted mb-2">
            <small>
              <i className="bi bi-calendar me-1"></i>
              {result.Year}
            </small>
            <span className="ms-3">
              <i className="bi bi-film me-1"></i>
              {result.Type.charAt(0).toUpperCase() + result.Type.slice(1)}
            </span>
          </p>
          <button
            className="btn btn-primary btn-sm mt-auto"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;